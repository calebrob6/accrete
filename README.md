accrete
=======

Accrete is a physical simulation of solar system planet formation. This simulation works by modelling a dust cloud around a Sun-like star, injecting a series of masses which collect dust, and form planets by accretion.


From the original README
------------------------

Accrete is a physical simulation of solar system planet formation,
originally published to Usenet-- probably comp.sources.unix-- in 1991
by Joe Nowakowski.  This software is in the public domain.

This simulation works by modelling a dust cloud around a Sun-like star,
injecting a series of masses which collect dust, and form planets.
The simulation then determines what the planetary environments will be
like in terms of temperature, atmospheric composition, and other
factors.

The following output will give a good idea of the end results:

<pre>
Planet #4:
   Distance from primary star (in A.U.): 1.038
   Eccentricity of orbit:	         0.004
   Mass (in Earth masses):   	         0.383
   Equatorial radius (in Km):         4675.0
   Density (in g/cc):  		         5.344
   Escape Velocity (in km/sec):          8.08
   Smallest molecular weight retained:	12.16   (CH4)
   Surface acceleration (in cm/sec2):  698.22
   Surface Gravity (in Earth gees):	 0.71
   Boiling point of water (celcius):    53.6
   Surface Pressure (in atmospheres):    0.146
   Surface temperature (Celcius):        8.39
   Hydrosphere percentage:              50.46
   Cloud cover percentage:              22.87
   Ice cover percentage:                 3.61
   Axial tilt (in degrees):     23
   Planetary albedo: 		0.177
   Length of year (in years):   1.06
   Length of day (in hours):   18.14
</pre>

...but I'll include a directory of a few sample runs at some point.  Enjoy.

-Chuck Swiger <chuck@pkix.net>


Included are the following libraries:

* sprintf.js by alexei, see https://github.com/alexei/sprintf.js
* mersenne-twister.js by Sean McCullough, see https://gist.github.com/banksean/300494
