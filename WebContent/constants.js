
var pow = Math.pow;
var sqrt = Math.sqrt;
var fabs = Math.abs;
var exp = Math.exp;
var log = Math.log;

var VERBOSE = false;

var NULL = null;
var PI = Math.PI;
var TRUE = true;
var FALSE = false;
var ECCENTRICITY_COEFF = (0.077);	/* Dole's was 0.077 */
var PROTOPLANET_MASS = (1.0E-15);	/* Units of solar masses */
var SOLAR_MASS_IN_GRAMS = (1.989E33);	/* Units of grams */
var EARTH_MASS_IN_GRAMS = (5.977E27);	/* Units of grams */
var EARTH_RADIUS = (6.378E6);	/* Units of cm */
var EARTH_RADIUS_IN_KM = (6378.0);	/* Units of km */
var EARTH_ACCELERATION = (981.0);	/* Units of cm/sec2 */
var EARTH_AXIAL_TILT = (23.4);	/* Units of degrees */
var EARTH_EXOSPHERE_TEMP = (1273.0);	/* Units of degrees Kelvin */
var EARTH_MASSES_PER_SOLAR_MASS = (332775.64);
var EARTH_EFFECTIVE_TEMP = (255.0);	/* Units of degrees Kelvin */
var EARTH_ALBEDO = (0.39);
var CLOUD_COVERAGE_FACTOR = (1.839E-8);	/* Km2/kg */
var EARTH_WATER_MASS_PER_AREA = (3.83E15);	/* grams per square km */
var EARTH_SURF_PRES_IN_MILLIBARS = (1000.0);
var EARTH_CONVECTION_FACTOR = (0.43);	/* from Hart, eq.20 */
var FREEZING_POINT_OF_WATER = (273.0);	/* Units of degrees Kelvin */
var DAYS_IN_A_YEAR = (365.256);	/* Earth days per Earth year */

/* gas_retention_threshold = 6.0; *//* ratio of esc vel to RMS vel */

var GAS_RETENTION_THRESHOLD = (5.0);	/* ratio of esc vel to RMS vel */
var GAS_GIANT_ALBEDO = (0.5);	/* albedo of a gas giant */
var CLOUD_ALBEDO = (0.52);
var AIRLESS_ROCKY_ALBEDO = (0.07);
var ROCKY_ALBEDO = (0.15);
var WATER_ALBEDO = (0.04);
var AIRLESS_ICE_ALBEDO = (0.5);
var ICE_ALBEDO = (0.7);
var SECONDS_PER_HOUR = (3600.0);
var CM_PER_AU = (1.495978707E13);	/* number of cm in an AU */
var CM_PER_KM = (1.0E5);	/* number of cm in a km */
var CM_PER_METER = (100.0);
var MILLIBARS_PER_BAR = (1000.0);
var KELVIN_CELCIUS_DIFFERENCE = (273.0);
var GRAV_CONSTANT = (6.672E-8);	/* units of dyne cm2/gram2 */
var GREENHOUSE_EFFECT_CONST = (0.93);	/* affects inner radius.. */
var MOLAR_GAS_CONST = (8314.41);	/* units: g*m2/=(sec2*K*mol); */
var K = (50.0);	/* K = gas/dust ratio */
var B = (1.2E-5);	/* Used in Crit_mass calc */
var DUST_DENSITY_COEFF = (2.0E-3);	/* A in Dole's paper */
var ALPHA = (5.0);	/* Used in density calcs */
var N = (3.0);	/* Used in density calcs */
var J = (1.46E-19);	/* Used in day-length calcs =(cm2/sec2 g); */
var INCREDIBLY_LARGE_NUMBER = (9.9999E37);

/* Now for a few molecular weights =(used for RMS velocity calcs);: */
/* This table is from Dole's book "Habitable Planets for Man", p. 38 */
var ATOMIC_HYDROGEN = (1.0);	/* H */
var MOLECULAR_HYDROGEN = (2.0);	/* H2 */
var HELIUM = (4.0);	/* He */
var ATOMIC_NITROGEN = (14.0);	/* N */
var ATOMIC_OXYGEN = (16.0);	/* O */
var METHANE = (16.0);	/* CH4 */
var AMMONIA = (17.0);	/* NH3 */
var WATER_VAPOR = (18.0);	/* H2O */
var NEON = (20.2);	/* Ne */
var MOLECULAR_NITROGEN = (28.0);	/* N2 */
var CARBON_MONOXIDE = (28.0);	/* CO */
var NITRIC_OXIDE = (30.0);	/* NO */
var MOLECULAR_OXYGEN = (32.0);	/* O2 */
var HYDROGEN_SULPHIDE = (34.1);	/* H2S */
var ARGON = (39.9);	/* Ar */
var CARBON_DIOXIDE = (44.0);	/* CO2 */
var NITROUS_OXIDE = (44.0);	/* N2O */
var NITROGEN_DIOXIDE = (46.0);	/* NO2 */
var OZONE = (48.0);	/* O3 */
var SULPHUR_DIOXIDE = (64.1);	/* SO2 */
var SULPHUR_TRIOXIDE = (80.1);	/* SO3 */
var KRYPTON = (83.8);	/* Kr */
var XENON = (131.3);	/* Xe */

/* The following defines are used in the kothari_radius function in */
/* file enviro.c. */
var A1_20 = (6.485E12);	/* All units are in cgs system. */
var A2_20 = (4.0032E-8);	/* ie: cm, g, dynes, etc. */
var BETA_20 = (5.71E12);

/* The following defines are used in determining the fraction of a planet */
/* covered with clouds in function cloud_fraction in file enviro.c. */
var Q1_36 = (1.258E19);	/* grams */
var Q2_36 = (0.0698);	/* 1/Kelvin */

