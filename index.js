const blessed = require('blessed');
const figlet = require('figlet');

const fs = require("fs");
const path = require("path");

const fontsDir = "./node_modules/figlet/fonts/";
const fonts = [];
const colors = ['blue', 'green', 'red', 'yellow', 'black']

fs.readdir(fontsDir, (err, files) => {
    const fontNames = files.map((file) => path.parse(file).name);
    console.log("Available fonts:", fontNames);
    fontNames.forEach((font) => {
      fonts.push(font);
    });
    console.log(`fonts: ${fonts.length}`);
  });

// Crear una pantalla
const screen = blessed.screen({
    smartCSR: true,
    title: 'Figlet en Blessed'
});

// Crear un cuadro
const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    content: '',
    border: { type: 'line' },
    style: { fg: 'white', bg: 'black' }
});

// Añadir el cuadro a la pantalla
screen.append(box);

// Función para actualizar el contenido del cuadro con texto figlet
function updateBoxContent(text, font, color) {
    figlet.text(text, { font: font }, function(err, data) {
        if (err) {
            box.setContent('Error: ' + err.message);
        } else {
            box.setContent(data);
            box.style.bg = color
        }
        screen.render();
    });
}

// Actualizar el cuadro con texto y fuente inicial
updateBoxContent('Hola', 'Ghost');

// Manejar eventos de teclado
screen.key(['escape', 'q', 'C-c'], function() {
    return process.exit(0);
});

setInterval(() => {
    const min = 0;
    const max = fonts.length;
    let currentFont = Math.floor(Math.random() * (max - min + 1)) + min;
    let currentColor = currentFont % colors.length;
    updateBoxContent(`${currentFont} --- ${fonts[currentFont]}`, fonts[currentFont], colors[currentColor]);
}, 3000);

// Renderizar la pantalla
screen.render();
