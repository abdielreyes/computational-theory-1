var fs = require('fs');
var readline = require('linebyline');
var words = ['auto', 'double', 'int', 'struct', 'break',
    'else', 'long', 'switch', 'case', 'enum', 'register',
    'typedef', 'char', 'extern', 'return', 'union', 'const',
    'float', 'short', 'unsigned', 'continue', 'for', 'signed',
    'void', 'default', 'goto', 'sizeof', 'volatile', 'do',
    'if', 'static', 'while'
];
var restrictions = [' ', '(', ')', '{', '}', ';', '', '=', '#'];
var out = [];

function analyzeLine(string, dictionary, lineCount) {
    var a = string.split(' ');
    a.forEach(e => {
        dictionary.forEach(w => {
            if (e.includes(w)) {
                restrictions.forEach((r) => {
                    var index = e.indexOf(w);
                    if ((r == e.charAt(index - 1)) && (r == e.charAt(index + w.length))) {
                        console.log([w, lineCount, e.indexOf(w)]);
                        out.push([w, lineCount, e.indexOf(w)]);
                    }
                });
                
            }
        });
    });
}
rl = readline('./main.c');
rl.on('line', function (line, lineCount) {
        analyzeLine(line, words, lineCount);
        var stream = fs.createWriteStream("my_file.txt");
        stream.once('open', function (fd) {
            out.forEach((o)=>{
                stream.write("Encontrado: "+o[0]+" en linea "+o[1]+", posicion "+o[2]+"\n");
            });
            stream.end();
        });
    })
    .on('error', function (e) {
        console.log("Error al leer archivo");
    });