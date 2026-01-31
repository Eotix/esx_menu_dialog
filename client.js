let currentDialog = null;

function openDialog(data, submit, cancel) {
    if (!data) data = {};
    data.title = data.title || "";
    data.value = data.value || "";

    currentDialog = { submit, cancel };

    SendNuiMessage(JSON.stringify({
        action: 'openDialog',
        data: data
    }));

    SetNuiFocus(true, true);
}

function closeDialog() {
    SendNuiMessage(JSON.stringify({ action: 'closeDialog' }));
    SetNuiFocus(false, false);
    currentDialog = null;
}

RegisterNuiCallbackType('dialog_submit');
on('__cfx_nui:dialog_submit', (data, cb) => {
    if (currentDialog && currentDialog.submit) {
        currentDialog.submit(data.value);
    }
    closeDialog();
    cb({ ok: true });
});

RegisterNuiCallbackType('dialog_cancel');
on('__cfx_nui:dialog_cancel', (data, cb) => {
    closeDialog();
    cb({ ok: true });
});

RegisterNuiCallbackType('ErrorSubmit');
on('__cfx_nui:ErrorSubmit', (data, cb) => {
    //DoHudText("error","МОЛЯ, ПОПЪЛНИ ПОЛЕТО");
    cb({ ok: true });
});
exports('openDialog', openDialog);
