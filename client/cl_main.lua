-- Example of how it works. Look at the `useCoreService`, and the nui function in `nui-events`
local focus = false
local isDead = false
local showControl = false
Citizen.CreateThread(function()
  while(true) do
      isDead = IsPedDeadOrDying(PlayerPedId())
      if isDead and showControl then
          close()
      end
      Citizen.Wait(500)
  end
end)

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(1)
            if IsControlJustReleased(1, 19) then
              Citizen.Wait(300)
              if focus then
                SetNuiFocus( false, false )
              else
                SetNuiFocus( true, true )
              end
              focus = not focus
            end
        end
    end
)

RegisterCommand('score:show', function(source, args, rawCommand)
  focus = true
  showControl = true
  SetNuiFocus( true, true )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = true
  })
end, false)

RegisterCommand('score:hide', function(source, args, rawCommand)
  focus = false
  showControl = false
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
end, false)

RegisterNUICallback("Close", function(data, cb)
  close()
  cb('OK')
end)

RegisterNUICallback("Focus", function(data, cb)
  if focus then
    SetNuiFocus( false, false )
  else
    SetNuiFocus( true, true )
  end
  focus = not focus
end)

function close ()
  showControl = false
  focus = false
  SetNuiFocus( false, false )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
end