import {stringify} from 'csv-stringify/browser/esm/sync';
import Papa from 'papaparse';

document.getElementById('convertButton').addEventListener('click', function() {
    const jsonInput = document.getElementById('json-input').value;

    try {
        const data = JSON.parse(jsonInput);
        const csvRows = []

        // Traverse messages and characters to get the required data
        for (const messageId in data.messages) {
            const message = data.messages[messageId];
            const character = data.characters[message.characterId];
            if (character && message.content) {
                const modelName = character.model
                const content = message.content
                csvRows.push({
                    'model name': modelName,
                    'content': content
                });
            }
        }

        // const csvString = stringify(csvRows, {header: true});
        const csvString = Papa.unparse(csvRows)


        // Use the Clipboard API to copy the text
        navigator.clipboard.write(data2).then(() => {
            console.log('Text copied to clipboard successfully!');
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });

        // Add file download
        const blob = new Blob([csvString], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.csv';
        a.click();
        URL.revokeObjectURL(url);


    } catch (error) {
        console.error('Invalid JSON input.', error);
        document.getElementById('csv-output').value = 'Invalid JSON input.';
    }
});