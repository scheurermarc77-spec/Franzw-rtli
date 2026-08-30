function corsHeaders(request, env) {
  const origin=request.headers.get('Origin') || '';
  const allowed=(env.ALLOWED_ORIGIN || '*').trim();
  const allowOrigin=allowed==='*' || origin===allowed ? (allowed==='*' ? '*' : origin) : allowed;
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers:{
      'Content-Type':'application/json; charset=utf-8',
      ...corsHeaders(request, env)
    }
  });
}

export default {
  async fetch(request, env) {
    if(request.method==='OPTIONS'){
      return new Response(null,{status:204,headers:corsHeaders(request,env)});
    }

    const url=new URL(request.url);

    if(url.pathname==='/health' && request.method==='GET'){
      return json({
        ok:Boolean(env.DEEPL_API_KEY),
        service:'francais-karten-deepl-proxy'
      }, env.DEEPL_API_KEY ? 200 : 503, request, env);
    }

    if(url.pathname!=='/translate' || request.method!=='POST'){
      return json({error:'Not found'},404,request,env);
    }

    if(!env.DEEPL_API_KEY){
      return json({error:'DEEPL_API_KEY ist auf dem Server nicht eingerichtet.'},503,request,env);
    }

    let body;
    try{
      body=await request.json();
    }catch{
      return json({error:'Ungültige Anfrage.'},400,request,env);
    }

    const text=typeof body.text==='string' ? body.text.trim() : '';
    if(!text || text.length>500){
      return json({error:'Bitte einen Begriff mit maximal 500 Zeichen senden.'},400,request,env);
    }

    const freeKey=env.DEEPL_API_KEY.endsWith(':fx');
    const deeplBase=freeKey ? 'https://api-free.deepl.com' : 'https://api.deepl.com';

    const deeplResponse=await fetch(deeplBase+'/v2/translate',{
      method:'POST',
      headers:{
        'Authorization':'DeepL-Auth-Key '+env.DEEPL_API_KEY,
        'Content-Type':'application/json',
        'User-Agent':'Francais-Karten/13'
      },
      body:JSON.stringify({
        text:[text],
        source_lang:'DE',
        target_lang:'FR',
        context:'German vocabulary for a French flashcard. Prefer the ordinary everyday meaning.'
      })
    });

    if(!deeplResponse.ok){
      let detail='';
      try{ detail=await deeplResponse.text(); }catch(_){}
      return json({
        error:'DeepL-Anfrage fehlgeschlagen.',
        status:deeplResponse.status,
        detail:detail.slice(0,300)
      },502,request,env);
    }

    const data=await deeplResponse.json();
    const translation=data?.translations?.[0]?.text?.trim() || '';
    if(!translation){
      return json({error:'DeepL hat keine Übersetzung geliefert.'},502,request,env);
    }

    return json({translation},200,request,env);
  }
};
