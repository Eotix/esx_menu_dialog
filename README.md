# esx_menu_dialog
Standalone версия


-----------------------------------
   exports['esx_menu_dialog']:openDialog(
        {
            title = "Въведи сума",
            value = ""
        },
        function(value) -- submit callback
            print("Submit: " .. value)
            DoHudText("success", "Въведохте: " .. value)
        end,
        function() -- cancel callback
            print("Cancelled")
        end
    )
