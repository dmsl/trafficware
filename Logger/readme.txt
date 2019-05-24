This is an application for taking measurements when the user is driving.
Specifically, it stores into a CSV file the following:
Timestamp,Lat,Lon,TypeofCell,Signal,CellId,MNC,LAC

where:
- Timestamp: the timestamp that the application "heard" a change on the device's cellualr network.
- Lat: Latitude of the location that the user was when the app "heard" the change.
- Lon: Longtitude of the location that the user was when the app "heard" the change.
- TypeOfCell: the type of cell that is identified from the cell (eg. GSM, UMTS, LTE, etc)
- Signal: the signal that the device receives from the cell
- Cellid: for GSM and LTE networks is cell ID (the identity that corresponds to each radius or field of an antenna), for UMTS networks is UTRAN Cell id, which is the merging of the two bytes of the cell ID.
- MNC: Net, or MNC (Mobile Network Code), is the number assigned to each provider of telecommunication networks.
- LAC: (Location Area Code) is a unique number for each region / area.

What is needed for the application to work:
- It keeps the screen unlocked and open while collecting information.
- It can not function properly when it is in the background, since in order to be able to detect and "hear" any changes regarding the connection of the device must be given priority to the device's cpu.
- the user must give the application the permissions they need when opening the application for the first time. These permissions are the following:
      - permission to access the device's files in order to be able to create, read and write to the CSV file
      - to get the user's location. 
- The GPS must be turned on
- The device must have a connection with a telecom provider.
