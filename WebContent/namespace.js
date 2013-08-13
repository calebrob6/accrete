/*  
These are all of the global variables used during accretion: 

anum
planet_head
stellar_mass_ratio
stellar_luminosity_ratio
main_seq_life
double age
r_ecosphere
r_greenhouse
radians_per_rotation
spin_resonance
randomTool
 */

var Accrete = (function() {

    var VERBOSE = false;

    var NULL = null;
    var PI = Math.PI;
    var TRUE = true;
    var FALSE = false;
    var ECCENTRICITY_COEFF = (0.077); /* Dole's was 0.077 */
    var PROTOPLANET_MASS = (1.0E-15); /* Units of solar masses */
    var SOLAR_MASS_IN_GRAMS = (1.989E33); /* Units of grams */
    var EARTH_MASS_IN_GRAMS = (5.977E27); /* Units of grams */
    var EARTH_RADIUS = (6.378E6); /* Units of cm */
    var EARTH_RADIUS_IN_KM = (6378.0); /* Units of km */
    var EARTH_ACCELERATION = (981.0); /* Units of cm/sec2 */
    var EARTH_AXIAL_TILT = (23.4); /* Units of degrees */
    var EARTH_EXOSPHERE_TEMP = (1273.0); /* Units of degrees Kelvin */
    var EARTH_MASSES_PER_SOLAR_MASS = (332775.64);
    var EARTH_EFFECTIVE_TEMP = (255.0); /* Units of degrees Kelvin */
    var EARTH_ALBEDO = (0.39);
    var CLOUD_COVERAGE_FACTOR = (1.839E-8); /* Km2/kg */
    var EARTH_WATER_MASS_PER_AREA = (3.83E15); /* grams per square km */
    var EARTH_SURF_PRES_IN_MILLIBARS = (1000.0);
    var EARTH_CONVECTION_FACTOR = (0.43); /* from Hart, eq.20 */
    var FREEZING_POINT_OF_WATER = (273.0); /* Units of degrees Kelvin */
    var DAYS_IN_A_YEAR = (365.256); /* Earth days per Earth year */

    /* gas_retention_threshold = 6.0; *//* ratio of esc vel to RMS vel */

    var GAS_RETENTION_THRESHOLD = (5.0); /* ratio of esc vel to RMS vel */
    var GAS_GIANT_ALBEDO = (0.5); /* albedo of a gas giant */
    var CLOUD_ALBEDO = (0.52);
    var AIRLESS_ROCKY_ALBEDO = (0.07);
    var ROCKY_ALBEDO = (0.15);
    var WATER_ALBEDO = (0.04);
    var AIRLESS_ICE_ALBEDO = (0.5);
    var ICE_ALBEDO = (0.7);
    var SECONDS_PER_HOUR = (3600.0);
    var CM_PER_AU = (1.495978707E13); /* number of cm in an AU */
    var CM_PER_KM = (1.0E5); /* number of cm in a km */
    var CM_PER_METER = (100.0);
    var MILLIBARS_PER_BAR = (1000.0);
    var KELVIN_CELCIUS_DIFFERENCE = (273.0);
    var GRAV_CONSTANT = (6.672E-8); /* units of dyne cm2/gram2 */
    var GREENHOUSE_EFFECT_CONST = (0.93); /* affects inner radius.. */
    var MOLAR_GAS_CONST = (8314.41); /* units: g*m2/=(sec2*K*mol); */
    var K = (50.0); /* K = gas/dust ratio */
    var B = (1.2E-5); /* Used in Crit_mass calc */
    var DUST_DENSITY_COEFF = (2.0E-3); /* A in Dole's paper */
    var ALPHA = (5.0); /* Used in density calcs */
    var N = (3.0); /* Used in density calcs */
    var J = (1.46E-19); /* Used in day-length calcs =(cm2/sec2 g); */
    var INCREDIBLY_LARGE_NUMBER = (9.9999E37);

    /* Now for a few molecular weights =(used for RMS velocity calcs);: */
    /* This table is from Dole's book "Habitable Planets for Man", p. 38 */
    var ATOMIC_HYDROGEN = (1.0); /* H */
    var MOLECULAR_HYDROGEN = (2.0); /* H2 */
    var HELIUM = (4.0); /* He */
    var ATOMIC_NITROGEN = (14.0); /* N */
    var ATOMIC_OXYGEN = (16.0); /* O */
    var METHANE = (16.0); /* CH4 */
    var AMMONIA = (17.0); /* NH3 */
    var WATER_VAPOR = (18.0); /* H2O */
    var NEON = (20.2); /* Ne */
    var MOLECULAR_NITROGEN = (28.0); /* N2 */
    var CARBON_MONOXIDE = (28.0); /* CO */
    var NITRIC_OXIDE = (30.0); /* NO */
    var MOLECULAR_OXYGEN = (32.0); /* O2 */
    var HYDROGEN_SULPHIDE = (34.1); /* H2S */
    var ARGON = (39.9); /* Ar */
    var CARBON_DIOXIDE = (44.0); /* CO2 */
    var NITROUS_OXIDE = (44.0); /* N2O */
    var NITROGEN_DIOXIDE = (46.0); /* NO2 */
    var OZONE = (48.0); /* O3 */
    var SULPHUR_DIOXIDE = (64.1); /* SO2 */
    var SULPHUR_TRIOXIDE = (80.1); /* SO3 */
    var KRYPTON = (83.8); /* Kr */
    var XENON = (131.3); /* Xe */

    /* The following defines are used in the kothari_radius function in */
    /* file enviro.c. */
    var A1_20 = (6.485E12); /* All units are in cgs system. */
    var A2_20 = (4.0032E-8); /* ie: cm, g, dynes, etc. */
    var BETA_20 = (5.71E12);

    /* The following defines are used in determining the fraction of a planet */
    /* covered with clouds in function cloud_fraction in file enviro.c. */
    var Q1_36 = (1.258E19); /* grams */
    var Q2_36 = (0.0698); /* 1/Kelvin */

    //--CONSTANTS--

    function getSmallestMolecularWeight(m) {
	if (m < MOLECULAR_HYDROGEN)
	    return ("H2");
	else if (m < HELIUM)
	    return ("He");
	else if (m < METHANE)
	    return ("CH4");
	else if (m < AMMONIA)
	    return ("NH3");
	else if (m < WATER_VAPOR)
	    return ("H2O");
	else if (m < NEON)
	    return ("Ne");
	else if (m < MOLECULAR_NITROGEN)
	    return ("N2");
	else if (m < CARBON_MONOXIDE)
	    return ("CO");
	else if (m < NITRIC_OXIDE)
	    return ("NO");
	else if (m < MOLECULAR_OXYGEN)
	    return ("O2");
	else if (m < HYDROGEN_SULPHIDE)
	    return ("H2S");
	else if (m < ARGON)
	    return ("Ar");
	else if (m < CARBON_DIOXIDE)
	    return ("CO2");
	else if (m < NITROUS_OXIDE)
	    return ("N2O");
	else if (m < NITROGEN_DIOXIDE)
	    return ("NO2");
	else if (m < OZONE)
	    return ("O3");
	else if (m < SULPHUR_DIOXIDE)
	    return ("SO2");
	else if (m < SULPHUR_TRIOXIDE)
	    return ("SO3");
	else if (m < KRYPTON)
	    return ("Kr");
	else if (m < XENON)
	    return ("Xe");
	else
	    return ("OTHER");
    }

    var systemToJSON = function() {

	var jsonOut = {
	    "star" : {
		"mass" : stellar_mass_ratio,
		"luminosity" : stellar_luminosity_ratio,
		"mainSequenceLifetime" : (main_seq_life / 1.0E6),
		"currentAge" : (age / 1.0E6),
		"ecospherRadius" : r_ecosphere
	    },
	    "planets" : []
	};

	var node1 = planet_head;
	var counter = 1;

	while (node1 != NULL) {
	    planetObject = {
		"number" : counter,
		"gasGiant" : node1.gas_giant,
		"resonantPeriod" : node1.resonant_period,
		"distanceFromPrimaryStar" : node1.a,
		"eccentricity" : node1.e,
		"mass" : node1.mass * EARTH_MASSES_PER_SOLAR_MASS,
		"equatorialRadius" : node1.radius,
		"density" : node1.density,
		"escapeVelocity" : node1.escape_velocity / CM_PER_KM,
		"smallestMolecularWeight" : getSmallestMolecularWeight(node1.molecule_weight),
		"surfaceAcceleration" : node1.surface_accel,
		"surfaceGravity" : node1.surface_grav,
		"boilingPointOfWater" : (node1.boil_point - KELVIN_CELCIUS_DIFFERENCE),
		"surfacePressure" : (node1.surface_pressure / 1000.0),
		"greenhouseEffect" : node1.greenhouse_effect,
		"surfaceTemperature" : (node1.surface_temp - KELVIN_CELCIUS_DIFFERENCE),
		"hydrospherePercentage" : (node1.hydrosphere * 100),
		"cloudCoverPercentage" : (node1.cloud_cover * 100),
		"iceCoverPercentage" : (node1.ice_cover * 100),
		"axialTilt" : node1.axial_tilt,
		"albedo" : node1.albedo,
		"lengthOfYear" : (node1.orbital_period / 365.25),
		"lengthOfDay" : node1.day,

	    };
	    jsonOut.planets.push(planetObject);
	    counter++;
	    node1 = node1.next_planet;
	}

	return jsonOut;
    };

    var display_system = function() {

	/*
	var output = function(msg) {
	document.getElementById("output").innerHTML += msg;
	};
	
	var node1 ;
	var counter;

	output(sprintf("                         SYSTEM  CHARACTERISTICS\n"));
	output(sprintf("Mass of central star:          %6.3f solar masses\n", stellar_mass_ratio));
	output(sprintf("Luminosity of central star:    %6.3f (relative to the sun)\n", stellar_luminosity_ratio));
	output(sprintf("Total main sequence lifetime:  %6.0f million years\n", (main_seq_life / 1.0E6)));
	output(sprintf("Current age of stellar system: %6.0f million years\n", (age / 1.0E6)));
	output(sprintf("Radius of habitable ecosphere: %6.3f AU\n\n", r_ecosphere));

	node1 = planet_head;
	counter = 1;

	while (node1 != NULL) {
	output(sprintf("Planet #%d:\n", counter));
	if (node1.gas_giant) {
	    output(sprintf("Gas giant...\n"));
	}
	if (node1.resonant_period) {
	    output(sprintf("In resonant period with primary.\n"));
	}
	output(sprintf("   Distance from primary star (in A.U.): %7.3f\n", node1.a));
	output(sprintf("   Eccentricity of orbit:                %7.3f\n", node1.e));
	output(sprintf("   Mass (in Earth masses):               %7.3f\n", node1.mass * EARTH_MASSES_PER_SOLAR_MASS));
	output(sprintf("   Equatorial radius (in Km):            %7.1f\n", node1.radius));
	output(sprintf("   Density (in g/cc):                    %7.3f\n", node1.density));
	output(sprintf("   Escape Velocity (in km/sec):          %7.2f\n", node1.escape_velocity / CM_PER_KM));
	output(sprintf("   Smallest molecular weight retained:   %7.2f", node1.molecule_weight));

	output("   "+getSmallestMolecularWeight(node1.molecule_weight)+"\n");

	output(sprintf("   Surface acceleration (in cm/sec2):    %7.2f\n", node1.surface_accel));
	if (!(node1.gas_giant)) {
	    output(sprintf("   Surface Gravity (in Earth gees):      %7.2f\n", node1.surface_grav));
	    if (node1.boil_point > 0.1)
		output(sprintf("   Boiling point of water (celcius):     %7.1f\n", (node1.boil_point - KELVIN_CELCIUS_DIFFERENCE)));
	    if (node1.surface_pressure > 0.00001) {
		output(sprintf("   Surface Pressure (in atmospheres):    %7.3f", (node1.surface_pressure / 1000.0)));
		if (node1.greenhouse_effect)
		    output(sprintf("     RUNAWAY GREENHOUSE EFFECT\n"));
		else
		    output(sprintf("\n"));
	    }
	    output(sprintf("   Surface temperature (Celcius):        %7.2f\n", (node1.surface_temp - KELVIN_CELCIUS_DIFFERENCE)));
	    if (node1.hydrosphere > 0.01)
		output(sprintf("   Hydrosphere percentage: %6.2f\n", (node1.hydrosphere * 100)));
	    if (node1.cloud_cover > 0.01)
		output(sprintf("   Cloud cover percentage: %6.2f\n", (node1.cloud_cover * 100)));
	    if (node1.ice_cover > 0.01)
		output(sprintf("   Ice cover percentage:   %6.2f\n", (node1.ice_cover * 100)));
	}
	output(sprintf("   Axial tilt (in degrees):   %7d\n", node1.axial_tilt));
	output(sprintf("   Planetary albedo:          %7.3f\n", node1.albedo));
	output(sprintf("   Length of year (in years): %7.2f\n", (node1.orbital_period / 365.25)));
	output(sprintf("   Length of day (in hours):  %7.2f\n\n", node1.day));
	counter++;
	node1 = node1.next_planet;
	}
	 */
    };

    //--DISPLAY--

    function luminosity(mass_ratio) {
	var n;

	if (mass_ratio < 1.0) {
	    n = 1.75 * (mass_ratio - 0.1) + 3.325;
	} else {
	    n = 0.5 * (2.0 - mass_ratio) + 4.4;
	}
	return (Math.pow(mass_ratio, n));
    }

    /*--------------------------------------------------------------------------*/
    /* This function, given the orbital radius of a planet in AU, returns */
    /* the orbital 'zone' of the particle. */
    /*--------------------------------------------------------------------------*/
    function orbital_zone(orbital_radius) {
	if (orbital_radius < (4.0 * Math.sqrt(stellar_luminosity_ratio)))
	    return 1;
	else {
	    if ((orbital_radius >= (4.0 * Math.sqrt(stellar_luminosity_ratio))) && (orbital_radius < (15.0 * Math.sqrt(stellar_luminosity_ratio))))
		return 2;
	    else
		return 3;
	}
    }

    /*--------------------------------------------------------------------------*/
    /* The mass is in units of solar masses, and the density is in units */
    /* of grams/cc. The radius returned is in units of km. */
    /*--------------------------------------------------------------------------*/

    // double
    function volume_radius(mass, density) {
	var volume;

	mass = mass * SOLAR_MASS_IN_GRAMS;
	volume = mass / density;
	return (Math.pow((3.0 * volume) / (4.0 * PI), (1.0 / 3.0)) / CM_PER_KM);
    }

    /*--------------------------------------------------------------------------*/
    /* Returns the radius of the planet in kilometers. */
    /* The mass passed in is in units of solar masses, the orbital radius */
    /* in A.U. */
    /* This formula is listed as eq.9 in Fogg's article, although some typos */
    /* crop up in that eq. See "The Internal Constitution of Planets", by */
    /* Dr. D. S. Kothari, Mon. Not. of the Royal Astronomical Society, vol 96 */
    /* pp.833-843, 1936 for the derivation. Specifically, this is Kothari's */
    /* eq.23, which appears on page 840. */
    /*--------------------------------------------------------------------------*/

    // double
    function kothari_radius(mass, orbital_radius, giant, zone) {
	var temp, temp2, atomic_weight, atomic_num;

	if (zone == 1) {
	    if (giant) {
		atomic_weight = 9.5;
		atomic_num = 4.5;
	    } else {
		atomic_weight = 15.0;
		atomic_num = 8.0;
	    }
	} else if (zone == 2) {
	    if (giant) {
		atomic_weight = 2.47;
		atomic_num = 2.0;
	    } else {
		atomic_weight = 10.0;
		atomic_num = 5.0;
	    }
	} else {
	    if (giant) {
		atomic_weight = 7.0;
		atomic_num = 4.0;
	    } else {
		atomic_weight = 10.0;
		atomic_num = 5.0;
	    }
	}
	temp = atomic_weight * atomic_num;
	temp = (2.0 * BETA_20 * Math.pow(SOLAR_MASS_IN_GRAMS, (1.0 / 3.0))) / (A1_20 * Math.pow(temp, (1.0 / 3.0)));
	temp2 = A2_20 * Math.pow(atomic_weight, (4.0 / 3.0)) * Math.pow(SOLAR_MASS_IN_GRAMS, (2.0 / 3.0));
	temp2 = temp2 * Math.pow(mass, (2.0 / 3.0));
	temp2 = temp2 / (A1_20 * Math.pow(atomic_num, 2.0));
	temp2 = 1.0 + temp2;
	temp = temp / temp2;
	temp = (temp * Math.pow(mass, (1.0 / 3.0))) / CM_PER_KM;
	return (temp);
    }

    /*--------------------------------------------------------------------------*/
    /* The mass passed in is in units of solar masses, and the orbital radius */
    /* is in units of AU. The density is returned in units of grams/cc. */
    /*--------------------------------------------------------------------------*/

    // double
    function empirical_density(mass, orbital_radius, gas_giant) {
	var temp;

	temp = Math.pow(mass * EARTH_MASSES_PER_SOLAR_MASS, (1.0 / 8.0));
	temp = temp * Math.pow(r_ecosphere / orbital_radius, (1.0 / 4.0));
	if (gas_giant)
	    return (temp * 1.2);
	else
	    return (temp * 5.5);
    }

    /*--------------------------------------------------------------------------*/
    /* The mass passed in is in units of solar masses, and the equatorial */
    /* radius is in km. The density is returned in units of grams/cc. */
    /*--------------------------------------------------------------------------*/

    // double
    function volume_density(mass, equatorial_radius) {
	var volume;

	mass = mass * SOLAR_MASS_IN_GRAMS;
	equatorial_radius = equatorial_radius * CM_PER_KM;
	volume = (4.0 * PI * Math.pow(equatorial_radius, 3.0)) / 3.0;
	return (mass / volume);
    }

    /*--------------------------------------------------------------------------*/
    /* The separation is in units of AU, and both masses are in units of solar */
    /* masses. The period returned is in terms of Earth days. */
    /*--------------------------------------------------------------------------*/

    // double
    function period(separation, small_mass, large_mass) {
	var period_in_years;

	period_in_years = Math.sqrt(Math.pow(separation, 3.0) / (small_mass + large_mass));
	return (period_in_years * DAYS_IN_A_YEAR);
    }

    /*--------------------------------------------------------------------------*/
    /* Fogg's information for this routine came from Dole "Habitable Planets */
    /* for Man", Blaisdell Publishing Company, NY, 1964. From this, he came */
    /* up with his eq.12, which is the equation for the base_angular_velocity */
    /* below. Going a bit further, he found an equation for the change in */
    /* angular velocity per time (dw/dt) from P. Goldreich and S. Soter's paper */
    /* "Q in the Solar System" in Icarus, vol 5, pp.375-389 (1966). Comparing */
    /* to the change in angular velocity for the Earth, we can come up with an */
    /* approximation for our new planet (his eq.13) and take that into account. */
    /*--------------------------------------------------------------------------*/

    // double
    function day_length(mass, radius, orbital_period, eccentricity, giant) {
	var base_angular_velocity, planetary_mass_in_grams, k2, temp, equatorial_radius_in_cm, change_in_angular_velocity, spin_resonance_period;

	spin_resonance = FALSE;
	if (giant)
	    k2 = 0.24;
	else
	    k2 = 0.33;
	planetary_mass_in_grams = mass * SOLAR_MASS_IN_GRAMS;
	equatorial_radius_in_cm = radius * CM_PER_KM;
	base_angular_velocity = Math.sqrt(2.0 * J * (planetary_mass_in_grams) / (k2 * Math.pow(equatorial_radius_in_cm, 2.0)));
	/* This next term describes how much a planet's rotation is slowed by */
	/* it's moons. Find out what dw/dt is after figuring out Goldreich and */
	/* Soter's Q'. */
	change_in_angular_velocity = 0.0;
	temp = base_angular_velocity + (change_in_angular_velocity * age);
	/* 'temp' is now the angular velocity. Now we change from rad/sec to */
	/* hours/rotation. */
	temp = 1.0 / ((temp / radians_per_rotation) * SECONDS_PER_HOUR);
	if (temp >= orbital_period) {
	    spin_resonance_period = ((1.0 - eccentricity) / (1.0 + eccentricity)) * orbital_period;
	    printf("...maybe: %f\n", spin_resonance_period);

	    if (eccentricity > 0.01) {
		printf("...resonance...\n");
		temp = spin_resonance_period;
		spin_resonance = TRUE;
	    } else
		temp = orbital_period;
	}
	return (temp);
    }

    /*--------------------------------------------------------------------------*/
    /* The orbital radius is expected in units of Astronomical Units (AU). */
    /* Inclination is returned in units of degrees. */
    /*--------------------------------------------------------------------------*/

    // int
    function inclination(orbital_radius) {
	var temp;

	temp = (Math.pow(orbital_radius, 0.2) * about(EARTH_AXIAL_TILT, 0.4));
	return (temp % 360);
    }

    /*--------------------------------------------------------------------------*/
    /* This function implements the escape velocity calculation. Note that */
    /* it appears that Fogg's eq.15 is incorrect. */
    /* The mass is in units of solar mass, the radius in kilometers, and the */
    /* velocity returned is in cm/sec. */
    /*--------------------------------------------------------------------------*/

    // double
    function escape_vel(mass, radius) {
	var mass_in_grams, radius_in_cm;

	mass_in_grams = mass * SOLAR_MASS_IN_GRAMS;
	radius_in_cm = radius * CM_PER_KM;
	return (Math.sqrt(2.0 * GRAV_CONSTANT * mass_in_grams / radius_in_cm));
    }

    /*--------------------------------------------------------------------------*/
    /* This is Fogg's eq.16. The molecular weight (usually assumed to be N2) */
    /* is used as the basis of the Root Mean Square velocity of the molecule */
    /* or atom. The velocity returned is in cm/sec. */
    /*--------------------------------------------------------------------------*/

    // double
    function rms_vel(molecular_weight, orbital_radius) {
	var exospheric_temp;

	exospheric_temp = EARTH_EXOSPHERE_TEMP / Math.pow(orbital_radius, 2.0);
	return (Math.sqrt((3.0 * MOLAR_GAS_CONST * exospheric_temp) / molecular_weight) * CM_PER_METER);
    }

    /*--------------------------------------------------------------------------*/
    /* This function returns the smallest molecular weight retained by the */
    /* body, which is useful for determining the atmosphere composition. */
    /*
     * Orbital radius is in A.U.(ie: in units of the earth's orbital radius), *) (*
     * mass is in units of solar masses, and equatorial radius is in units of
     */
    /* kilometers. */
    /*--------------------------------------------------------------------------*/

    // double
    function molecule_limit(orbital_radius, mass, equatorial_radius) {
	var escape_velocity;

	escape_velocity = escape_vel(mass, equatorial_radius);
	return ((3.0 * Math.pow(GAS_RETENTION_THRESHOLD * CM_PER_METER, 2.0) * MOLAR_GAS_CONST * EARTH_EXOSPHERE_TEMP) / Math.pow(escape_velocity, 2.0));
    }

    /*--------------------------------------------------------------------------*/
    /* This function calculates the surface acceleration of a planet. The */
    /* mass is in units of solar masses, the radius in terms of km, and the */
    /* acceleration is returned in units of cm/sec2. */
    /*--------------------------------------------------------------------------*/

    // double
    function acceleration(mass, radius) {
	return (GRAV_CONSTANT * (mass * SOLAR_MASS_IN_GRAMS) / Math.pow(radius * CM_PER_KM, 2.0));
    }

    /*--------------------------------------------------------------------------*/
    /* This function calculates the surface gravity of a planet. The */
    /* acceleration is in units of cm/sec2, and the gravity is returned in */
    /* units of Earth gravities. */
    /*--------------------------------------------------------------------------*/

    // double
    function gravity(acceleration) {
	return (acceleration / EARTH_ACCELERATION);
    }

    /*--------------------------------------------------------------------------*/
    /* Note that if the orbital radius of the planet is greater than or equal */
    /* to R_inner, 99% of it's volatiles are assumed to have been deposited in */
    /* surface reservoirs (otherwise, it suffers from the greenhouse effect). */
    /*--------------------------------------------------------------------------*/

    // int
    function greenhouse(zone, orbital_radius, greenhouse_radius) {
	if ((orbital_radius < greenhouse_radius) && (zone == 1))
	    return (TRUE);
	else
	    return (FALSE);
    }

    /*--------------------------------------------------------------------------*/
    /* This implements Fogg's eq.17. The 'inventory' returned is unitless. */
    /*--------------------------------------------------------------------------*/

    // double
    function vol_inventory(mass, escape_vel, rms_vel, stellar_mass, zone, greenhouse_effect) {
	var velocity_ratio, proportion_const, temp1, temp2, mass_in_earth_units;

	velocity_ratio = escape_vel / rms_vel;
	if (velocity_ratio >= GAS_RETENTION_THRESHOLD) {
	    switch (zone) {
	    case 1:
		proportion_const = 100000.0;
		break;
	    case 2:
		proportion_const = 75000.0;
		break;
	    case 3:
		proportion_const = 250.0;
		break;
	    default:
		proportion_const = 10.0;
		printf("Error: orbital zone not initialized correctly!\n");
		break;
	    }
	    mass_in_earth_units = mass * EARTH_MASSES_PER_SOLAR_MASS;
	    temp1 = (proportion_const * mass_in_earth_units) / stellar_mass;
	    temp2 = about(temp1, 0.2);
	    if (greenhouse_effect)
		return (temp2);
	    else
		return (temp2 / 100.0);
	} else {
	    return (0.0);
	}
	;
    }

    /*--------------------------------------------------------------------------*/
    /* This implements Fogg's eq.18. The pressure returned is in units of */
    /* millibars (mb). The gravity is in units of Earth gravities, the radius */
    /* in units of kilometers. */
    /*--------------------------------------------------------------------------*/

    // double
    function pressure(volatile_gas_inventory, equatorial_radius, gravity) {
	equatorial_radius = EARTH_RADIUS_IN_KM / equatorial_radius;
	return (volatile_gas_inventory * gravity / Math.pow(equatorial_radius, 2.0));
    }

    /*--------------------------------------------------------------------------*/
    /* This function returns the boiling point of water in an atmosphere of */
    /* pressure 'surface_pressure', given in millibars. The boiling point is */
    /* returned in units of Kelvin. This is Fogg's eq.21. */
    /*--------------------------------------------------------------------------*/

    // double
    function boiling_point(surface_pressure) {
	var surface_pressure_in_bars;

	surface_pressure_in_bars = surface_pressure / MILLIBARS_PER_BAR;
	return (1.0 / (Math.log(surface_pressure_in_bars) / -5050.5 + 1.0 / 373.0));
    }

    /*--------------------------------------------------------------------------*/
    /* This function is Fogg's eq.22. Given the volatile gas inventory and */
    /* planetary radius of a planet (in Km), this function returns the */
    /* fraction of the planet covered with water. */
    /* I have changed the function very slightly: the fraction of Earth's */
    /* surface covered by water is 71%, not 75% as Fogg used. */
    /*--------------------------------------------------------------------------*/

    // double
    function hydrosphere_fraction(volatile_gas_inventory, planetary_radius) {
	var temp;

	temp = (0.71 * volatile_gas_inventory / 1000.0) * Math.pow(EARTH_RADIUS_IN_KM / planetary_radius, 2.0);
	if (temp >= 1.0)
	    return (1.0);
	else
	    return (temp);
    }

    /*--------------------------------------------------------------------------*/
    /* Given the surface temperature of a planet (in Kelvin), this function */
    /* returns the fraction of cloud cover available. This is Fogg's eq.23. */
    /* See Hart in "Icarus" (vol 33, pp23 - 39, 1978) for an explanation. */
    /* This equation is Hart's eq.3. */
    /* I have modified it slightly using constants and relationships from */
    /* Glass's book "Introduction to Planetary Geology", p.46. */
    /* The 'CLOUD_COVERAGE_FACTOR' is the amount of surface area on Earth */
    /* covered by one Kg. of cloud. */
    /*--------------------------------------------------------------------------*/

    // double
    function cloud_fraction(surface_temp, smallest_MW_retained, equatorial_radius, hydrosphere_fraction) {
	var water_vapor_in_kg, fraction, surface_area, hydrosphere_mass;

	if (smallest_MW_retained > WATER_VAPOR) {
	    return (0.0);
	} else {
	    surface_area = 4.0 * PI * Math.pow(equatorial_radius, 2.0);
	    hydrosphere_mass = hydrosphere_fraction * surface_area * EARTH_WATER_MASS_PER_AREA;
	    water_vapor_in_kg = (0.00000001 * hydrosphere_mass) * Math.exp(Q2_36 * (surface_temp - 288.0));
	    fraction = CLOUD_COVERAGE_FACTOR * water_vapor_in_kg / surface_area;
	    if (fraction >= 1.0)
		return (1.0);
	    else
		return (fraction);
	}
	;
    }

    /*--------------------------------------------------------------------------*/
    /* Given the surface temperature of a planet (in Kelvin), this function */
    /* returns the fraction of the planet's surface covered by ice. This is */
    /* Fogg's eq.24. See Hart[24] in Icarus vol.33, p.28 for an explanation. */
    /* I have changed a constant from 70 to 90 in order to bring it more in */
    /* line with the fraction of the Earth's surface covered with ice, which */
    /* is approximatly .016 (=1.6%). */
    /*--------------------------------------------------------------------------*/

    // double
    function ice_fraction(hydrosphere_fraction, surface_temp) {
	var temp;

	if (surface_temp > 328.0)
	    surface_temp = 328.0;
	temp = Math.pow(((328.0 - surface_temp) / 90.0), 5.0);
	if (temp > (1.5 * hydrosphere_fraction))
	    temp = (1.5 * hydrosphere_fraction);
	if (temp >= 1.0)
	    return (1.0);
	else
	    return (temp);
    }

    /*--------------------------------------------------------------------------*/
    /* This is Fogg's eq.19. The ecosphere radius is given in AU, the orbital */
    /* radius in AU, and the temperature returned is in Kelvin. */
    /*--------------------------------------------------------------------------*/

    // double
    function eff_temp(ecosphere_radius, orbital_radius, albedo) {
	return (Math.sqrt(ecosphere_radius / orbital_radius) * Math.pow((1.0 - albedo) / 0.7, 0.25) * EARTH_EFFECTIVE_TEMP);
    }

    /*--------------------------------------------------------------------------*/
    /* This is Fogg's eq.20, and is also Hart's eq.20 in his "Evolution of */
    /* Earth's Atmosphere" article. The effective temperature given is in */
    /* units of Kelvin, as is the rise in temperature produced by the */
    /* greenhouse effect, which is returned. */
    /*--------------------------------------------------------------------------*/

    // double
    function green_rise(optical_depth, effective_temp, surface_pressure) {
	var convection_factor;

	convection_factor = EARTH_CONVECTION_FACTOR * Math.pow((surface_pressure / EARTH_SURF_PRES_IN_MILLIBARS), 0.25);
	return (Math.pow((1.0 + 0.75 * optical_depth), 0.25) - 1.0) * effective_temp * convection_factor;
    }

    /*--------------------------------------------------------------------------*/
    /* The surface temperature passed in is in units of Kelvin. */
    /* The cloud adjustment is the fraction of cloud cover obscuring each */
    /* of the three major components of albedo that lie below the clouds. */
    /*--------------------------------------------------------------------------*/

    // double
    function planet_albedo(water_fraction, cloud_fraction, ice_fraction, surface_pressure) {
	var rock_fraction, cloud_adjustment, components, cloud_contribution, rock_contribution, water_contribution, ice_contribution;

	rock_fraction = 1.0 - water_fraction - ice_fraction;
	components = 0.0;
	if (water_fraction > 0.0)
	    components = components + 1.0;
	if (ice_fraction > 0.0)
	    components = components + 1.0;
	if (rock_fraction > 0.0)
	    components = components + 1.0;
	cloud_adjustment = cloud_fraction / components;
	if (rock_fraction >= cloud_adjustment)
	    rock_fraction = rock_fraction - cloud_adjustment;
	else
	    rock_fraction = 0.0;
	if (water_fraction > cloud_adjustment)
	    water_fraction = water_fraction - cloud_adjustment;
	else
	    water_fraction = 0.0;
	if (ice_fraction > cloud_adjustment)
	    ice_fraction = ice_fraction - cloud_adjustment;
	else
	    ice_fraction = 0.0;
	cloud_contribution = cloud_fraction * about(CLOUD_ALBEDO, 0.2);
	if (surface_pressure == 0.0)
	    rock_contribution = rock_fraction * about(AIRLESS_ROCKY_ALBEDO, 0.3);
	else
	    rock_contribution = rock_fraction * about(ROCKY_ALBEDO, 0.1);
	water_contribution = water_fraction * about(WATER_ALBEDO, 0.2);
	if (surface_pressure == 0.0)
	    ice_contribution = ice_fraction * about(AIRLESS_ICE_ALBEDO, 0.4);
	else
	    ice_contribution = ice_fraction * about(ICE_ALBEDO, 0.1);
	return (cloud_contribution + rock_contribution + water_contribution + ice_contribution);
    }

    /*--------------------------------------------------------------------------*/
    /* This function returns the dimensionless quantity of optical depth, */
    /* which is useful in determining the amount of greenhouse effect on a */
    /* planet. */
    /*--------------------------------------------------------------------------*/
    function opacity(molecular_weight, surface_pressure) {
	var optical_depth;

	optical_depth = 0.0;
	if ((molecular_weight >= 0.0) && (molecular_weight < 10.0))
	    optical_depth = optical_depth + 3.0;
	if ((molecular_weight >= 10.0) && (molecular_weight < 20.0))
	    optical_depth = optical_depth + 2.34;
	if ((molecular_weight >= 20.0) && (molecular_weight < 30.0))
	    optical_depth = optical_depth + 1.0;
	if ((molecular_weight >= 30.0) && (molecular_weight < 45.0))
	    optical_depth = optical_depth + 0.15;
	if ((molecular_weight >= 45.0) && (molecular_weight < 100.0))
	    optical_depth = optical_depth + 0.05;
	if (surface_pressure >= (70.0 * EARTH_SURF_PRES_IN_MILLIBARS))
	    optical_depth = optical_depth * 8.333;
	else if (surface_pressure >= (50.0 * EARTH_SURF_PRES_IN_MILLIBARS))
	    optical_depth = optical_depth * 6.666;
	else if (surface_pressure >= (30.0 * EARTH_SURF_PRES_IN_MILLIBARS))
	    optical_depth = optical_depth * 3.333;
	else if (surface_pressure >= (10.0 * EARTH_SURF_PRES_IN_MILLIBARS))
	    optical_depth = optical_depth * 2.0;
	else if (surface_pressure >= (5.0 * EARTH_SURF_PRES_IN_MILLIBARS))
	    optical_depth = optical_depth * 1.5;
	return (optical_depth);
    }

    /*--------------------------------------------------------------------------*/
    /* The temperature calculated is in degrees Kelvin. */
    /* Quantities already known which are used in these calculations: */
    /* planet->molecule_weight */
    /* planet->surface_pressure */
    /* R_ecosphere */
    /* planet->a */
    /* planet->volatile_gas_inventory */
    /* planet->radius */
    /* planet->boil_point */
    /*--------------------------------------------------------------------------*/
    function iterate_surface_temp(planet) {

	var surface_temp, effective_temp, greenhouse_rise, previous_temp, optical_depth, albedo = 0.0, water = 0.0, clouds = 0.0, ice = 0.0;

	optical_depth = opacity(planet.molecule_weight, planet.surface_pressure);
	effective_temp = eff_temp(r_ecosphere, planet.a, EARTH_ALBEDO);
	greenhouse_rise = green_rise(optical_depth, effective_temp, planet.surface_pressure);
	surface_temp = effective_temp + greenhouse_rise;
	previous_temp = surface_temp - 5.0;
	while ((Math.abs(surface_temp - previous_temp) > 1.0)) {
	    previous_temp = surface_temp;
	    water = hydrosphere_fraction(planet.volatile_gas_inventory, planet.radius);
	    clouds = cloud_fraction(surface_temp, planet.molecule_weight, planet.radius, water);
	    ice = ice_fraction(water, surface_temp);
	    if ((surface_temp >= planet.boil_point) || (surface_temp <= FREEZING_POINT_OF_WATER)) {
		water = 0.0;
	    }
	    albedo = planet_albedo(water, clouds, ice, planet.surface_pressure);
	    optical_depth = opacity(planet.molecule_weight, planet.surface_pressure);
	    effective_temp = eff_temp(r_ecosphere, planet.a, albedo);
	    greenhouse_rise = green_rise(optical_depth, effective_temp, planet.surface_pressure);
	    surface_temp = effective_temp + greenhouse_rise;
	}
	planet.hydrosphere = water;
	planet.cloud_cover = clouds;
	planet.ice_cover = ice;
	planet.albedo = albedo;
	planet.surface_temp = surface_temp;
    }
    ;

    //--ENVIRO--

    /*
     * Internal data objects, modeled after C structs
     * MASS is used to pass values by refrence 
     */

    var dust_bands_record = function() {
	this.inner_edge;
	this.outer_edge;
	this.dist_present;
	this.gas_present;
	this.next_band = NULL;
    };

    var planets_record = function() {
	this.a; /* semi-major axis of the orbit (in AU)*/
	this.e; /* eccentricity of the orbit	     */
	this.mass; /* mass (in solar masses)	     */
	this.gas_giant; /* TRUE if the planet is a gas giant */
	this.orbit_zone; /* the 'zone' of the planet          */
	this.radius; /* equatorial radius (in km)	     */
	this.density; /* density (in g/cc)		     */
	this.orbital_period; /* length of the local year (days)   */
	this.day; /* length of the local day (hours)   */
	this.resonant_period; /* TRUE if in resonant rotation   */
	this.axial_tilt; /* units of degrees		     */
	this.escape_velocity; /* units of cm/sec		     */
	this.surface_accel; /* units of cm/sec2		     */
	this.surface_grav; /* units of Earth gravities	     */
	this.rms_velocity; /* units of cm/sec		     */
	this.molecule_weight; /* smallest molecular weight retained*/
	this.volatile_gas_inventory;
	this.surface_pressure; /* units of millibars (mb)	     */
	this.greenhouse_effect; /* runaway greenhouse effect?	*/
	this.boil_point; /* the boiling point of water (Kelvin)*/
	this.albedo; /* albedo of the planet		     */
	this.surface_temp; /* surface temperature in Kelvin     */
	this.hydrosphere; /* fraction of surface covered	     */
	this.cloud_cover; /* fraction of surface covered	     */
	this.ice_cover; /* fraction of surface covered	     */
	this.first_moon;
	this.next_planet = NULL;
    };

    var MASS = function(x) {
	this.VALUE = x;
    };

    //--STRUCTS--

    function random_number(inner, outer) {
	var delta = Math.abs(outer - inner);
	if (inner < outer) {
	    return (inner + delta * randomTool.genrand_real3());
	} else {
	    return (outer + delta * randomTool.genrand_real3());
	}
    }
    ;

    /*----------------------------------------------------------------------*/
    /* This function returns a value within a certain variation of the */
    /* exact value given it in 'value'. */
    /*----------------------------------------------------------------------*/
    function about(value, variation) {
	var inner = value - variation;
	return (inner + 2.0 * variation * randomTool.genrand_real3());
    }
    ;

    function random_eccentricity() {
	return (1.0 - Math.pow((randomTool.genrand_real3()), ECCENTRICITY_COEFF));
    }
    ;

    //--UTILS--

    /*----------------------------------------------------------------------*/
    /*                           BIBLIOGRAPHY                               */
    /*  Dole, Stephen H.  "Formation of Planetary Systems by Aggregation:   */
    /*      a Computer Simulation"  October 1969,  Rand Corporation Paper   */
    /*	P-4226.								*/
    /*----------------------------------------------------------------------*/

    /* Variables global to the accretion process */
    var dust_left;
    var r_inner;
    var r_outer;
    var reduced_mass;
    var dust_density;
    var cloud_eccentricity;
    var dust_head;

    function set_initial_conditions(inner_limit_of_dust, outer_limit_of_dust) {
	dust_head = new dust_bands_record();
	planet_head = NULL;
	dust_head.next_band = NULL;
	dust_head.outer_edge = outer_limit_of_dust;
	dust_head.inner_edge = inner_limit_of_dust;
	dust_head.dust_present = TRUE;
	dust_head.gas_present = TRUE;
	dust_left = TRUE;
	cloud_eccentricity = 0.2;
    }

    function stellar_dust_limit(stellar_mass_ratio) {
	return (200.0 * Math.pow(stellar_mass_ratio, (1.0 / 3.0)));
    }

    function innermost_planet(stellar_mass_ratio) {
	return (0.3 * Math.pow(stellar_mass_ratio, (1.0 / 3.0)));
    }

    function outermost_planet(stellar_mass_ratio) {
	return (50.0 * Math.pow(stellar_mass_ratio, (1.0 / 3.0)));
    }

    function inner_effect_limit(a, e, mass) {
	return (a * (1.0 - e) * (1.0 - mass) / (1.0 + cloud_eccentricity));
    }

    function outer_effect_limit(a, e, mass) {
	return (a * (1.0 + e) * (1.0 + reduced_mass) / (1.0 - cloud_eccentricity));
    }

    function dust_available(inside_range, outside_range) {
	var current_dust_band;
	var dust_here;

	current_dust_band = dust_head;
	while ((current_dust_band != NULL) && (current_dust_band.outer_edge < inside_range))
	    current_dust_band = current_dust_band.next_band;
	if (current_dust_band == NULL)
	    dust_here = FALSE;
	else
	    dust_here = current_dust_band.dust_present;
	while ((current_dust_band != NULL) && (current_dust_band.inner_edge < outside_range)) {
	    dust_here = dust_here || current_dust_band.dust_present;
	    current_dust_band = current_dust_band.next_band;
	}
	return (dust_here);
    }

    function update_dust_lanes(min, max, mass, crit_mass, body_inner_bound, body_outer_bound) {
	var gas;
	var node1 = new dust_bands_record(), node2 = new dust_bands_record(), node3 = new dust_bands_record();

	dust_left = FALSE;
	if ((mass > crit_mass)) {
	    gas = FALSE;
	} else {
	    gas = TRUE;
	}
	node1 = dust_head;
	while ((node1 != NULL)) {
	    if (((node1.inner_edge < min) && (node1.outer_edge > max))) {
		node2 = new dust_bands_record();
		node2.inner_edge = min;
		node2.outer_edge = max;
		if ((node1.gas_present == TRUE)) {
		    node2.gas_present = gas;
		} else {
		    node2.gas_present = FALSE;
		}
		node2.dust_present = FALSE;
		node3 = new dust_bands_record();
		node3.inner_edge = max;
		node3.outer_edge = node1.outer_edge;
		node3.gas_present = node1.gas_present;
		node3.dust_present = node1.dust_present;
		node3.next_band = node1.next_band;
		node1.next_band = node2;
		node2.next_band = node3;
		node1.outer_edge = min;
		node1 = node3.next_band;
	    } else if (((node1.inner_edge < max) && (node1.outer_edge > max))) {
		node2 = new dust_bands_record();
		node2.next_band = node1.next_band;
		node2.dust_present = node1.dust_present;
		node2.gas_present = node1.gas_present;
		node2.outer_edge = node1.outer_edge;
		node2.inner_edge = max;
		node1.next_band = node2;
		node1.outer_edge = max;
		if ((node1.gas_present == TRUE))
		    node1.gas_present = gas;
		else
		    node1.gas_present = FALSE;
		node1.dust_present = FALSE;
		node1 = node2.next_band;
	    } else if (((node1.inner_edge < min) && (node1.outer_edge > min))) {
		node2 = new dust_bands_record();
		node2.next_band = node1.next_band;
		node2.dust_present = FALSE;
		if ((node1.gas_present == TRUE))
		    node2.gas_present = gas;
		else
		    node2.gas_present = FALSE;
		node2.outer_edge = node1.outer_edge;
		node2.inner_edge = min;
		node1.next_band = node2;
		node1.outer_edge = min;
		node1 = node2.next_band;
	    } else if (((node1.inner_edge >= min) && (node1.outer_edge <= max))) {
		if ((node1.gas_present == TRUE)) {
		    node1.gas_present = gas;
		}
		node1.dust_present = FALSE;
		node1 = node1.next_band;
	    } else if (((node1.outer_edge < min) || (node1.inner_edge > max))) {
		node1 = node1.next_band;
	    }
	    ;
	}
	node1 = dust_head;
	while ((node1 != NULL)) {
	    if (((node1.dust_present) && (((node1.outer_edge >= body_inner_bound) && (node1.inner_edge <= body_outer_bound)))))
		dust_left = TRUE;
	    node2 = node1.next_band;
	    if ((node2 != NULL)) {
		if (((node1.dust_present == node2.dust_present) && (node1.gas_present == node2.gas_present))) {
		    node1.outer_edge = node2.outer_edge;
		    node1.next_band = node2.next_band;
		    // free(node2);
		}
	    }
	    node1 = node1.next_band;
	}
    }

    function collect_dust(last_mass, a, e, crit_mass, dust_band) {
	var mass_density, temp1, temp2, temp, temp_density, bandwidth, width, volume;

	temp = last_mass / (1.0 + last_mass);
	reduced_mass = Math.pow(temp, (1.0 / 4.0));
	r_inner = inner_effect_limit(a, e, reduced_mass);
	r_outer = outer_effect_limit(a, e, reduced_mass);
	if ((r_inner < 0.0))
	    r_inner = 0.0;
	if ((dust_band == NULL))
	    return (0.0);
	else {
	    if ((dust_band.dust_present == FALSE))
		temp_density = 0.0;
	    else
		temp_density = dust_density;
	    if (((last_mass < crit_mass) || (dust_band.gas_present == FALSE)))
		mass_density = temp_density;
	    else
		mass_density = K * temp_density / (1.0 + Math.sqrt(crit_mass / last_mass) * (K - 1.0));
	    if (((dust_band.outer_edge <= r_inner) || (dust_band.inner_edge >= r_outer)))
		return (collect_dust(last_mass, a, e, crit_mass, dust_band.next_band));
	    else {
		bandwidth = (r_outer - r_inner);
		temp1 = r_outer - dust_band.outer_edge;
		if (temp1 < 0.0)
		    temp1 = 0.0;
		width = bandwidth - temp1;
		temp2 = dust_band.inner_edge - r_inner;
		if (temp2 < 0.0)
		    temp2 = 0.0;
		width = width - temp2;
		temp = 4.0 * PI * Math.pow(a, 2.0) * reduced_mass * (1.0 - e * (temp1 - temp2) / bandwidth);
		volume = temp * width;
		return (volume * mass_density + collect_dust(last_mass, a, e, crit_mass, dust_band.next_band));
	    }
	}
    }

    /*--------------------------------------------------------------------------*/
    /* Orbital radius is in AU, eccentricity is unitless, and the stellar */
    /* luminosity ratio is with respect to the sun. The value returned is the */
    /* mass at which the planet begins to accrete gas as well as dust, and is */
    /* in units of solar masses. */
    /*--------------------------------------------------------------------------*/

    function critical_limit(orbital_radius, eccentricity, stellar_luminosity_ratio) {
	var temp, perihelion_dist;

	perihelion_dist = (orbital_radius - orbital_radius * eccentricity);
	temp = perihelion_dist * Math.sqrt(stellar_luminosity_ratio);
	return (B * Math.pow(temp, -0.75));
    }

    // (double *seed_mass, double a, double e, double crit_mass, double body_inner_bound, double body_outer_bound)
    function accrete_dust(seed_mass, a, e, crit_mass, body_inner_bound, body_outer_bound) {
	var new_mass, temp_mass;

	new_mass = seed_mass.VALUE;
	do {
	    temp_mass = new_mass;
	    new_mass = collect_dust(new_mass, a, e, crit_mass, dust_head);
	} while (!(((new_mass - temp_mass) < (0.0001 * temp_mass))));
	seed_mass.VALUE = seed_mass.VALUE + new_mass;
	update_dust_lanes(r_inner, r_outer, seed_mass.VALUE, crit_mass, body_inner_bound, body_outer_bound);
    }

    function coalesce_planetesimals(a, e, mass, crit_mass, stellar_luminosity_ratio, body_inner_bound, body_outer_bound) {
	var node1, node2, node3;
	var coalesced;
	var dist1, dist2, a3;

	var temp;

	coalesced = FALSE;
	node1 = planet_head;
	node2 = NULL;
	node3 = NULL;
	while ((node1 != NULL)) {
	    node2 = node1;
	    temp = new MASS(node1.a - a);
	    if ((temp.VALUE > 0.0)) {
		dist1 = (a * (1.0 + e) * (1.0 + reduced_mass)) - a;
		/* x aphelion */
		reduced_mass = Math.pow((node1.mass / (1.0 + node1.mass)), (1.0 / 4.0));
		dist2 = node1.a - (node1.a * (1.0 - node1.e) * (1.0 - reduced_mass));
	    } else {
		dist1 = a - (a * (1.0 - e) * (1.0 - reduced_mass));
		/* x perihelion */
		reduced_mass = Math.pow(node1.mass / (1.0 + node1.mass), (1.0 / 4.0));
		dist2 = (node1.a * (1.0 + node1.e) * (1.0 + reduced_mass)) - node1.a;
	    }
	    if (((Math.abs(temp.VALUE) <= Math.abs(dist1)) || (Math.abs(temp.VALUE) <= Math.abs(dist2)))) {
		console.debug(sprintf("Collision between two planetesimals!\n"));
		a3 = (node1.mass + mass) / ((node1.mass / node1.a) + (mass / a));
		temp = new MASS(node1.mass * Math.sqrt(node1.a) * Math.sqrt(1.0 - Math.pow(node1.e, 2.0)));
		temp.VALUE = temp.VALUE + (mass * Math.sqrt(a) * Math.sqrt(Math.sqrt(1.0 - Math.pow(e, 2.0))));
		temp.VALUE = temp.VALUE / ((node1.mass + mass) * Math.sqrt(a3));
		temp.VALUE = 1.0 - Math.pow(temp.VALUE, 2.0);
		if (((temp.VALUE < 0.0) || (temp.VALUE >= 1.0)))
		    temp.VALUE = 0.0;
		e = Math.sqrt(temp.VALUE);
		temp.VALUE = node1.mass + mass;
		accrete_dust(temp, a3, e, stellar_luminosity_ratio, body_inner_bound, body_outer_bound);
		node1.a = a3;
		node1.e = e;
		node1.mass = temp.VALUE;
		node1 = NULL;
		coalesced = TRUE;
	    } else
		node1 = node1.next_planet;
	}
	if (!(coalesced)) {
	    node3 = new planets_record();
	    node3.a = a;
	    node3.e = e;
	    if ((mass >= crit_mass))
		node3.gas_giant = TRUE;
	    else
		node3.gas_giant = FALSE;
	    node3.mass = mass;
	    if ((planet_head == NULL)) {
		planet_head = node3;
		node3.next_planet = NULL;
	    } else {
		node1 = planet_head;
		if ((a < node1.a)) {
		    node3.next_planet = node1;
		    planet_head = node3;
		} else if ((planet_head.next_planet == NULL)) {
		    planet_head.next_planet = node3;
		    node3.next_planet = NULL;
		} else {
		    while (((node1 != NULL) && (node1.a < a))) {
			node2 = node1;
			node1 = node1.next_planet;
		    }
		    node3.next_planet = node1;
		    node2.next_planet = node3;
		}
	    }
	}
    }

    function distribute_planetary_masses(stellar_mass_ratio, stellar_luminosity_ratio, inner_dust, outer_dust) {
	var a, e, crit_mass, planetesimal_inner_bound, planetesimal_outer_bound;
	var mass;

	set_initial_conditions(inner_dust, outer_dust);
	planetesimal_inner_bound = innermost_planet(stellar_mass_ratio);
	planetesimal_outer_bound = outermost_planet(stellar_mass_ratio);
	while (dust_left) {
	    a = random_number(planetesimal_inner_bound, planetesimal_outer_bound);
	    e = random_eccentricity();
	    mass = new MASS(PROTOPLANET_MASS);
	    if (VERBOSE) {
		console.debug(sprintf("Checking %f AU.\n", a));
	    }
	    if (dust_available(inner_effect_limit(a, e, mass.VALUE), outer_effect_limit(a, e, mass.VALUE))) {
		console.debug(sprintf(".. Injecting protoplanet.\n"));
		dust_density = DUST_DENSITY_COEFF * Math.sqrt(stellar_mass_ratio) * Math.exp(-ALPHA * Math.pow(a, (1.0 / N)));
		crit_mass = critical_limit(a, e, stellar_luminosity_ratio);
		accrete_dust(mass, a, e, crit_mass, planetesimal_inner_bound, planetesimal_outer_bound);
		if ((mass.VALUE != 0.0) && (mass.VALUE != PROTOPLANET_MASS)) {
		    coalesce_planetesimals(a, e, mass.VALUE, crit_mass, stellar_luminosity_ratio, planetesimal_inner_bound, planetesimal_outer_bound);
		} else {
		    console.debug(sprintf(".. failed due to large neighbor.\n"));
		}
	    } else {
		if (VERBOSE) {
		    console.debug(sprintf(".. failed.\n"));
		}
	    }

	}
	return (planet_head);
    }

    //--ACCRETE--

    var anum;
    var planet_head;
    var stellar_mass_ratio;
    var stellar_luminosity_ratio;
    var main_seq_life;
    var age, r_ecosphere;
    var r_greenhouse;
    var radians_per_rotation;
    var spin_resonance;
    var randomTool;

    function generate_stellar_system() {
	var planet;
	radians_per_rotation = 2.0 * PI;
	stellar_mass_ratio = random_number(0.6, 1.3);
	stellar_luminosity_ratio = luminosity(stellar_mass_ratio);

	planet = distribute_planetary_masses(stellar_mass_ratio, stellar_luminosity_ratio, 0.0, stellar_dust_limit(stellar_mass_ratio));

	main_seq_life = 1.0E10 * (stellar_mass_ratio / stellar_luminosity_ratio);
	if ((main_seq_life >= 6.0E9))
	    age = random_number(1.0E9, 6.0E9);
	else
	    age = random_number(1.0E9, main_seq_life);
	r_ecosphere = Math.sqrt(stellar_luminosity_ratio);
	r_greenhouse = r_ecosphere * GREENHOUSE_EFFECT_CONST;

	while (planet != NULL) {
	    planet.orbit_zone = orbital_zone(planet.a);
	    if (planet.gas_giant) {
		planet.density = empirical_density(planet.mass, planet.a, planet.gas_giant);
		planet.radius = volume_radius(planet.mass, planet.density);
	    } else {
		planet.radius = kothari_radius(planet.mass, planet.a, planet.gas_giant, planet.orbit_zone);
		planet.density = volume_density(planet.mass, planet.radius);
	    }
	    planet.orbital_period = period(planet.a, planet.mass, stellar_mass_ratio);
	    planet.day = day_length(planet.mass, planet.radius, planet.orbital_period, planet.e, planet.gas_giant);
	    planet.resonant_period = spin_resonance;
	    planet.axial_tilt = inclination(planet.a);
	    planet.escape_velocity = escape_vel(planet.mass, planet.radius);
	    planet.surface_accel = acceleration(planet.mass, planet.radius);
	    planet.rms_velocity = rms_vel(MOLECULAR_NITROGEN, planet.a);
	    planet.molecule_weight = molecule_limit(planet.a, planet.mass, planet.radius);
	    if ((planet.gas_giant)) {
		planet.surface_grav = INCREDIBLY_LARGE_NUMBER;
		planet.greenhouse_effect = FALSE;
		planet.volatile_gas_inventory = INCREDIBLY_LARGE_NUMBER;
		planet.surface_pressure = INCREDIBLY_LARGE_NUMBER;
		planet.boil_point = INCREDIBLY_LARGE_NUMBER;
		planet.hydrosphere = INCREDIBLY_LARGE_NUMBER;
		planet.albedo = about(GAS_GIANT_ALBEDO, 0.1);
		planet.surface_temp = INCREDIBLY_LARGE_NUMBER;
	    } else {
		planet.surface_grav = gravity(planet.surface_accel);
		planet.greenhouse_effect = greenhouse(planet.orbit_zone, planet.a, r_greenhouse);
		planet.volatile_gas_inventory = vol_inventory(planet.mass, planet.escape_velocity, planet.rms_velocity, stellar_mass_ratio, planet.orbit_zone, planet.greenhouse_effect);
		planet.surface_pressure = pressure(planet.volatile_gas_inventory, planet.radius, planet.surface_grav);
		if ((planet.surface_pressure == 0.0))
		    planet.boil_point = 0.0;
		else
		    planet.boil_point = boiling_point(planet.surface_pressure);
		iterate_surface_temp(planet);
	    }
	    planet = planet.next_planet;
	}
    }

    function main(x) {
	randomTool = x;
	generate_stellar_system();
	return systemToJSON();
    }
    
    return {
	getSystem : function(mTwister){
	    return main(mTwister);
	}
    };

})();
