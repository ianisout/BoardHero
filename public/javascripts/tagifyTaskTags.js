const inputTags = document.querySelector('input[name=tags]');

// const whitelist = ["A# .NET", "A# (Axiom)", "A-0 System", "A+", "A++", "ABAP", "ABC", "ABC ALGOL", "ABSET", "ABSYS", "ACC", "Accent", "Ace DASL", "ACL2", "Avicsoft", "ACT-III", "Action!", "ActionScript", "Ada", "Adenine", "Agda", "Agilent VEE", "Agora", "AIMMS", "Alef", "ALF", "ALGOL 58", "ALGOL 60", "ALGOL 68", "ALGOL W", "Alice", "Alma-0", "AmbientTalk", "Amiga E", "AMOS", "AMPL", "Apex (Salesforce.com)", "APL", "AppleScript", "Arc", "ARexx", "Argus", "AspectJ", "Assembly language", "ATS", "Ateji PX", "AutoHotkey", "Autocoder", "AutoIt", "AutoLISP / Visual LISP", "Averest", "AWK", "Axum", "Active Server Pages", "ASP.NET", "B", "Babbage", "Bash", "BASIC", "bc", "BCPL", "BeanShell", "Batch (Windows/Dos)", "Bertrand", "BETA", "Bigwig", "Bistro", "BitC", "BLISS", "Blockly", "BlooP", "Blue", "Boo", "Boomerang", "Bourne shell (including bash and ksh)", "BREW", "BPEL", "B", "C--", "C++ – ISO/IEC 14882", "C# – ISO/IEC 23270", "C/AL", "Caché ObjectScript", "C Shell", "Caml", "Cayenne", "CDuce", "Cecil", "Cesil", "Céu", "Ceylon", "CFEngine", "CFML", "Cg", "Ch", "Chapel", "Charity", "Charm", "Chef", "CHILL", "CHIP-8", "chomski", "ChucK", "CICS", "Cilk", "Citrine (programming language)", "CL (IBM)", "Claire", "Clarion", "Clean", "Clipper", "CLIPS", "CLIST", "Clojure", "CLU", "CMS-2", "COBOL – ISO/IEC 1989", "CobolScript – COBOL Scripting language", "Cobra", "CODE", "CoffeeScript", "ColdFusion", "COMAL", "Combined Programming Language (CPL)", "COMIT", "Common Intermediate Language (CIL)", "Common Lisp (also known as CL)", "COMPASS", "Component Pascal", "Constraint Handling Rules (CHR)", "COMTRAN", "Converge", "Cool", "Coq", "Coral 66", "Corn", "CorVision", "COWSEL", "CPL", "CPL", "Cryptol", "csh", "Csound", "CSP", "CUDA", "Curl", "Curry", "Cybil", "Cyclone", "Cython", "Java", "Javascript", "M2001", "M4", "M#", "Machine code", "MAD (Michigan Algorithm Decoder)", "MAD/I", "Magik", "Magma", "make", "Maple", "MAPPER now part of BIS", "MARK-IV now VISION:BUILDER", "Mary", "MASM Microsoft Assembly x86", "MATH-MATIC", "Mathematica", "MATLAB", "Maxima (see also Macsyma)", "Max (Max Msp – Graphical Programming Environment)", "Maya (MEL)", "MDL", "Mercury", "Mesa", "Metafont", "Microcode", "MicroScript", "MIIS", "Milk (programming language)", "MIMIC", "Mirah", "Miranda", "MIVA Script", "ML", "Model 204", "Modelica", "Modula", "Modula-2", "Modula-3", "Mohol", "MOO", "Mortran", "Mouse", "MPD", "Mathcad", "MSIL – deprecated name for CIL", "MSL", "MUMPS", "Mystic Programming L"];

async function getTagsList() {
    try {
      const tagsList = await axios.get("/task/tags-list");
      return tagsList.data;
    } catch (err) {
      console.error(err);
    }
}

getTagsList().then((tagsList) => {
    // initialize Tagify on the above input node reference
    const tagify = new Tagify(inputTags, {
        enforceWhitelist: false,
        whitelist: tagsList
    })
    
    // Chainable event listeners
    tagify.on('add', onAddTag)
          .on('remove', onRemoveTag)
          .on('input', onInput)
          .on('edit', onTagEdit)
          .on('invalid', onInvalidTag)
          .on('click', onTagClick)
          .on('focus', onTagifyFocusBlur)
          .on('blur', onTagifyFocusBlur)
          .on('dropdown:hide dropdown:show', e => console.log(e.type))
          .on('dropdown:select', onDropdownSelect)
    
    const mockAjax = (function mockAjax(){
        let timeout;
        return function(duration){
            clearTimeout(timeout); // abort last request
            return new Promise(function(resolve, reject){
                timeout = setTimeout(resolve, duration || 700, whitelist)
            })
        }
    })()
    
    // tag added callback
    function onAddTag(e){
        console.log("onAddTag: ", e.detail);
        console.log("original input value: ", inputTags.value)
        tagify.off('add', onAddTag) // exmaple of removing a custom Tagify event
    }
    
    // tag remvoed callback
    function onRemoveTag(e){
        console.log("onRemoveTag:", e.detail, "tagify instance value:", tagify.value)
    }
    
    // on character(s) added/removed (user is typing/deleting)
    function onInput(e){
        console.log("onInput: ", e.detail);
        tagify.settings.whitelist.length = 0; // reset current whitelist
        tagify.loading(true).dropdown.hide.call(tagify) // show the loader animation
    
        // get new whitelist from a delayed mocked request (Promise)
        mockAjax()
            .then(function(result){
                // replace tagify "whitelist" array values with new values
                // and add back the ones already choses as Tags
                tagify.settings.whitelist.push(...result, ...tagify.value)
    
                // render the suggestions dropdown.
                tagify.loading(false).dropdown.show.call(tagify, e.detail.value);
            })
    }
    
    function onTagEdit(e){
        console.log("onTagEdit: ", e.detail);
    }
    
    // invalid tag added callback
    function onInvalidTag(e){
        console.log("onInvalidTag: ", e.detail);
    }
    
    // invalid tag added callback
    function onTagClick(e){
        console.log(e.detail);
        console.log("onTagClick: ", e.detail);
    }
    
    function onTagifyFocusBlur(e){
        console.log(e.type, "event fired")
    }
    
    function onDropdownSelect(e){
        console.log("onDropdownSelect: ", e.detail)
    }
});
