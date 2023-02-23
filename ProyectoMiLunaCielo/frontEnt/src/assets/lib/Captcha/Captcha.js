
var ALPHABETIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ALPHANUMERIC = ALPHABETIC + '0123456789';
var m_hashv;
var DOTS = [
    ['   *   ', '  * *  ', '  * *  ', ' *   * ', ' ***** ', '*     *', '*     *'],
    ['****** ', '*     *', '*     *', '****** ', '*     *', '*     *', '****** '],
    [' ***** ', '*     *', '*      ', '*      ', '*      ', '*     *', ' ***** '],
    ['****** ', '*     *', '*     *', '*     *', '*     *', '*     *', '****** '],
    ['*******', '*      ', '*      ', '****   ', '*      ', '*      ', '*******'],
    ['*******', '*      ', '*      ', '****   ', '*      ', '*      ', '*      '],
    [' ***** ', '*     *', '*      ', '*      ', '*   ***', '*     *', ' ***** '],
    ['*     *', '*     *', '*     *', '*******', '*     *', '*     *', '*     *'],
    ['*******', '   *   ', '   *   ', '   *   ', '   *   ', '   *   ', '*******'],
    ['      *', '      *', '      *', '      *', '      *', '*     *', ' ***** '],
    ['*     *', '*   ** ', '* **   ', '**     ', '* **   ', '*   ** ', '*     *'],
    ['*      ', '*      ', '*      ', '*      ', '*      ', '*      ', '*******'],
    ['*     *', '**   **', '* * * *', '*  *  *', '*     *', '*     *', '*     *'],
    ['*     *', '**    *', '* *   *', '*  *  *', '*   * *', '*    **', '*     *'],
    [' ***** ', '*     *', '*     *', '*     *', '*     *', '*     *', ' ***** '],
    ['****** ', '*     *', '*     *', '****** ', '*      ', '*      ', '*      '],
    [' ***** ', '*     *', '*     *', '*     *', '*   * *', '*    * ', ' **** *'],
    ['****** ', '*     *', '*     *', '****** ', '*   *  ', '*    * ', '*     *'],
    [' ***** ', '*     *', '*      ', ' ***** ', '      *', '*     *', ' ***** '],
    ['*******', '   *   ', '   *   ', '   *   ', '   *   ', '   *   ', '   *   '],
    ['*     *', '*     *', '*     *', '*     *', '*     *', '*     *', ' ***** '],
    ['*     *', '*     *', ' *   * ', ' *   * ', '  * *  ', '  * *  ', '   *   '],
    ['*     *', '*     *', '*     *', '*  *  *', '* * * *', '**   **', '*     *'],
    ['*     *', ' *   * ', '  * *  ', '   *   ', '  * *  ', ' *   * ', '*     *'],
    ['*     *', ' *   * ', '  * *  ', '   *   ', '   *   ', '   *   ', '   *   '],
    ['*******', '     * ', '    *  ', '   *   ', '  *    ', ' *     ', '*******'],
    ['  ***  ', ' *   * ', '*   * *', '*  *  *', '* *   *', ' *   * ', '  ***  '],
    ['   *   ', '  **   ', ' * *   ', '   *   ', '   *   ', '   *   ', '*******'],
    [' ***** ', '*     *', '      *', '     * ', '   **  ', ' **    ', '*******'],
    [' ***** ', '*     *', '      *', '    ** ', '      *', '*     *', ' ***** '],
    ['    *  ', '   **  ', '  * *  ', ' *  *  ', '*******', '    *  ', '    *  '],
    ['*******', '*      ', '****** ', '      *', '      *', '*     *', ' ***** '],
    ['  **** ', ' *     ', '*      ', '****** ', '*     *', '*     *', ' ***** '],
    ['*******', '     * ', '    *  ', '   *   ', '  *    ', ' *     ', '*      '],
    [' ***** ', '*     *', '*     *', ' ***** ', '*     *', '*     *', ' ***** '],
    [' ***** ', '*     *', '*     *', ' ******', '      *', '     * ', ' ****  ']
];
var m_dot = '+';
var m_regenerate = 'cambiar Imagen';
var m_length = 5;
function init(m_dot, m_regenerate, m_length) {
    this.m_dot = m_dot;
    this.m_regenerate = m_regenerate;
    this.m_length = m_length;
}
function getHTML(strtexto) {

    var html = '<div style="text-align:left;padding-top:10px;">' + '<div style="font-family: Courier New, monospace;font-size: 6px;    font-weight: bold;    letter-spacing: -1px;   line-height: 3px; padding:5px">';

    for (var i = 0; i < DOTS[0].length; i++) {
        for (var j = 0; j < strtexto.length; j++) {
            html += DOTS[ALPHANUMERIC.indexOf(strtexto.charAt(j))][i].replace(/ /g, '&nbsp;').replace(/\*/g, this.m_dot) + '&nbsp;&nbsp;';
        }
        html += '<br>';
    }
    html += '</div><button type="button" class="btn btn-outline-success">' + this.m_regenerate; + '</button></div>';
    return html
}
function gethash(strvalue) {
    var hash = 5381;;
    for (var i = 0; i < strvalue.length; i++) {
        hash = ((hash << 5) + hash) + strvalue.charCodeAt(i);
    }

    return hash;
}
function changetext() {
    var text = '';
    for (var i = 0; i < this.m_length; i++) {
        text += ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length));
    }
    var val = this.gethash(text);
    this.m_hashv = val;
    return this.getHTML(text);
}
function match(texto) {
    var hash = gethash(texto);
    return m_hashv == hash;
}


// funcion para validar el correo
function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
        alert("La dirección de email " + valor + " es correcta.");
    } else {
        alert("La dirección de email es incorrecta.");
    }
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}
