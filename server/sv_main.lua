RegisterNetEvent('rabbit-score:sv:Submit')
AddEventHandler('rabbit-score:sv:Submit', function(data)
  TriggerClientEvent('rabbit-score:cl:Submit', -1, data)
end)

RegisterNetEvent('rabbit-score:sv:showBanWeapon')
AddEventHandler('rabbit-score:sv:showBanWeapon', function()
  TriggerClientEvent('rabbit-score:cl:showBanWeapon', -1)
end)

RegisterNetEvent('rabbit-score:sv:closeBanWeapon')
AddEventHandler('rabbit-score:sv:closeBanWeapon', function()
  TriggerClientEvent('rabbit-score:cl:closeBanWeapon', -1)
end)