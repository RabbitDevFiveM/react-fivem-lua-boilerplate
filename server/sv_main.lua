RegisterNetEvent('rabbit-score:sv:Submit')
AddEventHandler('rabbit-score:sv:Submit', function(data)
  TriggerClientEvent('rabbit-score:cl:Submit', -1, data)
end)