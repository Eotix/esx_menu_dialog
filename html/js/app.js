window.addEventListener('message', (event) => {
    let d = event.data;
    let container = document.getElementById('dialogContainer');
    let input = document.getElementById('dialogInput');
    let title = document.getElementById('dialogTitle');

    if (d.action === 'openDialog') {
        title.innerText = d.data.title || "";
        input.value = d.data.value || "";
        container.style.display = 'block';
        input.focus();
    }

    if (d.action === 'closeDialog') {
        container.style.display = 'none';
    }
});

document.getElementById('dialogSubmit').addEventListener('click', () => {
    let value = document.getElementById('dialogInput').value;
        if (!value || value.trim() === "") {
            fetch(`https://${GetParentResourceName()}/ErrorSubmit`, {
            method: 'POST',
            body: JSON.stringify({ value })
        });
            return;
        }
    fetch(`https://${GetParentResourceName()}/dialog_submit`, {
        method: 'POST',
        body: JSON.stringify({ value })
    });
});

document.getElementById('dialogCancel').addEventListener('click', () => {
    fetch(`https://${GetParentResourceName()}/dialog_cancel`, {
        method: 'POST',
        body: JSON.stringify({})
    });
});