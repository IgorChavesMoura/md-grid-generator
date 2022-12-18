
const thumbUrl = "http://dl.fujifilm-x.com/global/products/cameras/gfx100s/sample-images/gfx100s_sample_04_oulq.jpg?_ga=2.24164089.233567237.1671396285-427024027.1671396285";

const previewMdElement = document.querySelector('md-block');

const rowsInput = document.querySelector('#rows-input');
const columnsInput = document.querySelector('#columns-input');

const rowsInputLabel = document.querySelector('label[for="rows-input"]');
const columnsInputLabel = document.querySelector('label[for="columns-input"]');

const copyMarkdownButton = document.querySelector('#copy-md');

let markdownSource = '';
let rows;
let columns;

function generateMarkdown() {

    if(!rows || !columns) return;

    let result = ``;

    const head = [];

    for(let i = 0; i <= columns; i++) {
        head.push('|');
    }

    result += head.join(' ') + '\n';
    result += head.join(':-------------------------:') + '\n';

    let currentIndex = 1;

    for(let row = 1; row <= rows; row++) {
        const currentRow = ['|'];
        for(let column = 1; column <= columns; column++) {

            const currentElement = `<img style="width: 100%" alt="${'image-' + currentIndex}" src="${thumbUrl}">  Element ${currentIndex} |`;
            currentRow.push(currentElement);

            currentIndex++;
        }
        result += currentRow.join('') + '\n';
    }

    previewMdElement.mdContent = result;
    markdownSource = result;

}

function setRowsAndColumns() {
    rows = parseInt(rowsInput.value);
    columns = parseInt(columnsInput.value);

    rowsInputLabel.textContent = `Rows: ${rows}`;
    columnsInputLabel.textContent = `Columns: ${columns}`;
}

function copyMarkdownToClipboard() {
    if(!!markdownSource) {
        navigator.clipboard.writeText(markdownSource);
    }

    copyMarkdownButton.textContent = 'Markdown copied!'

    setTimeout(() => copyMarkdownButton.textContent = 'Copy markdown source', 1000);
}

function handleChange() {
    setRowsAndColumns();

    generateMarkdown();
}

rowsInput.onchange = handleChange;
columnsInput.onchange = handleChange;

copyMarkdownButton.onclick = copyMarkdownToClipboard;

setRowsAndColumns();
generateMarkdown();