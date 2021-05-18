local focus = false
local isDead = false
local showControl = false
local showUI = false

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
              if showControl then
                if not focus then
                  SetNuiFocus( true, true )
                else
                  SetNuiFocus( false, false )
                end
                focus = not focus
              end
            end

            if IsControlJustReleased(1, 166) then
              Citizen.Wait(300)
              if not showControl then
                control()
              else
                close()
              end
            end
        end
    end
)

RegisterNetEvent('rabbit-score:cl:Submit')
AddEventHandler('rabbit-score:cl:Submit', function(data)
  if not data.showUi then
    close()
  end

  if data.showUi then
    show()
    SendNUIMessage({
      app = "REACTNUI",
      method = "setJsonData",
      data = {
        right={
          score=data.right.score,
          logo=data.right.logo,
          star=data.right.star,
        },
        left={
          score=data.left.score,
          logo=data.left.logo,
          star=data.left.star,
        }
      }
    })
  end
end)

RegisterNUICallback("Submit", function(data, cb)
  TriggerServerEvent('rabbit-score:sv:Submit', data)
end)

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

function control ()
  showControl = true
  focus = true
  showUI = true
  SetNuiFocus( true, true )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = true
  })
  SendNUIMessage({
    app = "REACTNUI",
    method = "setControlPanel",
    data = true
  })
end

function show ()
  showUI = true
  SetNuiFocus( true, true )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = true
  })
end

function close ()
  showControl = false
  focus = false
  showUI = false
  SetNuiFocus( false, false )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
  SendNUIMessage({
    app = "REACTNUI",
    method = "setControlPanel",
    data = false
  })
end