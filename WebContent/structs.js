
var dust_bands_record = function(){
	this.inner_edge;
	this.outer_edge;
	this.dist_present;
	this.gas_present;
	this.next_band = NULL;
};

var planets_record = function(){
    this.a;			/* semi-major axis of the orbit (in AU)*/
    this.e;			/* eccentricity of the orbit	     */
    this.mass;		/* mass (in solar masses)	     */
    this.gas_giant;		/* TRUE if the planet is a gas giant */
    this.orbit_zone;             /* the 'zone' of the planet          */
    this.radius;		/* equatorial radius (in km)	     */
    this.density;		/* density (in g/cc)		     */
    this.orbital_period;	/* length of the local year (days)   */
    this.day;			/* length of the local day (hours)   */
    this.resonant_period;	/* TRUE if in resonant rotation   */
    this.axial_tilt;		/* units of degrees		     */
    this.escape_velocity;	/* units of cm/sec		     */
    this.surface_accel;	/* units of cm/sec2		     */
    this.surface_grav;	/* units of Earth gravities	     */
    this.rms_velocity;	/* units of cm/sec		     */
    this.molecule_weight;	/* smallest molecular weight retained*/
    this.volatile_gas_inventory;
    this.surface_pressure;	/* units of millibars (mb)	     */
    this.greenhouse_effect;	/* runaway greenhouse effect?	*/
    this.boil_point;		/* the boiling point of water (Kelvin)*/
    this.albedo;		/* albedo of the planet		     */
    this.surface_temp;	/* surface temperature in Kelvin     */
    this.hydrosphere;		/* fraction of surface covered	     */
    this.cloud_cover;		/* fraction of surface covered	     */
    this.ice_cover;		/* fraction of surface covered	     */
    this.first_moon;
    this.next_planet = NULL;
};

var MASS = function(x){
    this.VALUE = x;
}

var TEMP = function(x){
    this.VALUE = x;
}

/*
Record of variable types

typedef struct planets_record {
	double a;			
	double e;			
	double mass;		
	int gas_giant;		
	int orbit_zone;           
	double radius;
	double density;	
	double orbital_period;	
	double day;			
	int resonant_period;	
	int axial_tilt;		
	double escape_velocity;	
	double surface_accel;	
	double surface_grav;	
	double rms_velocity;	
	double molecule_weight;	
	double volatile_gas_inventory;
	double surface_pressure;	
	int greenhouse_effect;	
	double boil_point;		
	double albedo;		
	double surface_temp;	
	double hydrosphere;		
	double cloud_cover;		
	double ice_cover;		
	planet_pointer first_moon;
	planet_pointer next_planet;
} planets;

*/