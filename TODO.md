TODO
=======

The following changes need to be made:

* Wrap the whole accrete program in its own namespace so it can operate safely alongside other javascript code
* Write hooks into the simulation process that can handle callback functions
* ~~Provide JSON or text output from the simulation results~~
* Get rid of the sprintf usage
* Get rid of the renaming of the C math.h functions to their javascript counterparts (eg. var fabs = Math.abs needs to be propogated)
* Provide an Accrete object that can take stellar mass and a MTwister object that outputs JSON system

The following things are done:
* Provide JSON or text output from the simulation results
