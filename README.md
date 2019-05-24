# trafficware

This respository contains source code that was implemented during a thesis named "TrafficWare: Traffic Mapping with Telco Data". More Specifically, it contains code for a logger, a website, and four programmes that were implemented for an experiment.

# GNU GPL Licence
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

Υou should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.

Authors: J.Georgiou (University of Cyprus)

Supervisors: D. Zeinalipour-Yazti (University of Cyprus)

Copyright (c) 2019, Data Management Systems Lab (DMSL), University of Cyprus. All rights reserved.


# Logger: 
Stores info into a csv file every time cellular info changes. This info may be change of cellular network or signal. Works only for android mobile phones.
It the timestamp, latitude, longitude of the device when it found the change, cellid, mnc and lac of the cell that the device can find or is connected to.

# Website:
Shows interactively geographic data on a map with different kind of functions. It uses the Leaflet Library, and more specifically, the Heatmap, Cluster and Prune functions.

# Programmes for exeperiment: 
PHP, Nodejs, Java and Spark Java, they read from a file data, and then they process the data and filter them. 
