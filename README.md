# trafficware

This respository contains source code that was written by Joanna Georgiou for a thesis named "TrafficWare: Traffic Mapping 
with Telco Data". More Specifically, it contains code for a logger, a website, and four programmes that were implemented for
an experiment.


Logger = Stores info into a csv file every time cellular info changes. This info may be change of cellular network or signal. 
It the timestamp, latitude, longitude of the device when it found the change, cellid, mnc and lac of the cell that the device 
can find or is connected to.

Website = Shows interactively geographic data on a map with different kind of functions. It uses the Leaflet Library, and more
specifically, the Heatmap, Cluster and Prune functions.

Programmes for exeperiment = PHP, Nodejs, Java and Spark Java, they read from a file data, and then they process the data and
filter them. 
