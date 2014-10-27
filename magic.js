(function(){
  var $ = function(s){return document.querySelectorAll(s);},
      preview = $('#preview')[0],
      gen_file = $('input[type="radio"]')[0],
      code = $('#code')[0],
      form = $('form')[0],
      iframe = $('iframe')[0],
      headlines = {
        code: document.createElement('h2'),
        preview: document.createElement('h2')
      },
      submit_btn = $('button')[0];

    headlines.code.innerHTML = 'Code';
    headlines.preview.innerHTML = 'Preview';

  iframe.onload = function() {
    var contents;
    if ( this.contentDocument ) {
      contents = this.contentDocument.getElementsByTagName('body')[0];
    } else if ( iFrame.contentWindow ) {
      contents = this.contentWindow.document.getElementsByTagName('body')[0];
    }
    preview.parentNode.insertBefore(headlines.preview, preview.previousSibling);
    preview.innerHTML = contents.outerHTML;
    code.parentNode.insertBefore(headlines.code, code.previousSibling);
    code.innerHTML = contents.outerHTML.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
     return '&#'+i.charCodeAt(0)+';';
    });
    code.style.border = '1px solid #000';
    window.location.href='#code';
  };

  submit_btn.onclick = function ( ev ) {
    ev.preventDefault();
    if ( gen_file.checked ) {
      form.target = '_self';
    } else {
      form.target = 'hidden_iframe';
    }
    form.submit();
  };
}());
