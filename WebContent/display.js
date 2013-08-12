
var output = function(msg){
    document.getElementById("output").innerHTML += msg;
}


var display_system = function(){

     var node1; 
     var counter;

     output(sprintf("                         SYSTEM  CHARACTERISTICS\n"));
     output(sprintf("Mass of central star:          %6.3f solar masses\n", stellar_mass_ratio));
     output(sprintf("Luminosity of central star:    %6.3f (relative to the sun)\n",stellar_luminosity_ratio));
     output(sprintf("Total main sequence lifetime:  %6.0f million years\n", (main_seq_life / 1.0E6)));
     output(sprintf("Current age of stellar system: %6.0f million years\n",(age / 1.0E6)));
     output(sprintf("Radius of habitable ecosphere: %6.3f AU\n\n",r_ecosphere));

     node1 = planet_head;
     counter = 1;

     while (node1 != NULL) {
	  output(sprintf("Planet #%d:\n",counter));
	  if (node1.gas_giant){
	      output(sprintf("Gas giant...\n"));
	  }
	  if (node1.resonant_period){
	      output(sprintf("In resonant period with primary.\n"));
	  }
	  output(sprintf("   Distance from primary star (in A.U.): %7.3f\n",node1.a));
	  output(sprintf("   Eccentricity of orbit:                %7.3f\n",node1.e));
	  output(sprintf("   Mass (in Earth masses):               %7.3f\n",node1.mass * EARTH_MASSES_PER_SOLAR_MASS));
	  output(sprintf("   Equatorial radius (in Km):            %7.1f\n",node1.radius));
	  output(sprintf("   Density (in g/cc):                    %7.3f\n",node1.density));
	  output(sprintf("   Escape Velocity (in km/sec):          %7.2f\n",node1.escape_velocity / CM_PER_KM));
	  output(sprintf("   Smallest molecular weight retained:   %7.2f",node1.molecule_weight));
	  
	  if (node1.molecule_weight < MOLECULAR_HYDROGEN)
	      output(sprintf("   (H2)\n"));
	  else if (node1.molecule_weight < HELIUM)
	      output(sprintf("   (He)\n"));
	  else if (node1.molecule_weight < METHANE)
	      output(sprintf("   (CH4)\n"));
	  else if (node1.molecule_weight < AMMONIA)
	      output(sprintf("   (NH3)\n"));
	  else if (node1.molecule_weight < WATER_VAPOR)
	      output(sprintf("   (H2O)\n"));
	  else if (node1.molecule_weight < NEON)
	      output(sprintf("   (Ne)\n"));
	  else if (node1.molecule_weight < MOLECULAR_NITROGEN)
	      output(sprintf("   (N2)\n"));
	  else if (node1.molecule_weight < CARBON_MONOXIDE)
	      output(sprintf("   (CO)\n"));
	  else if (node1.molecule_weight < NITRIC_OXIDE)
	      output(sprintf("   (NO)\n"));
	  else if (node1.molecule_weight < MOLECULAR_OXYGEN)
	      output(sprintf("   (O2)\n"));
	  else if (node1.molecule_weight < HYDROGEN_SULPHIDE)
	      output(sprintf("   (H2S)\n"));
	  else if (node1.molecule_weight < ARGON)
	      output(sprintf("   (Ar)\n"));
	  else if (node1.molecule_weight < CARBON_DIOXIDE)
	      output(sprintf("   (CO2)\n"));
	  else if (node1.molecule_weight < NITROUS_OXIDE)
	      output(sprintf("   (N2O)\n"));
	  else if (node1.molecule_weight < NITROGEN_DIOXIDE)
	      output(sprintf("   (NO2)\n"));
	  else if (node1.molecule_weight < OZONE)
	      output(sprintf("   (O3)\n"));
	  else if (node1.molecule_weight < SULPHUR_DIOXIDE)
	      output(sprintf("   (SO2)\n"));
	  else if (node1.molecule_weight < SULPHUR_TRIOXIDE)
	      output(sprintf("   (SO3)\n"));
	  else if (node1.molecule_weight < KRYPTON)
	      output(sprintf("   (Kr)\n"));
	  else if (node1.molecule_weight < XENON)
	      output(sprintf("   (Xe)\n"));
	  else
	      output(sprintf("\n"));
	  
	  output(sprintf(     "   Surface acceleration (in cm/sec2):    %7.2f\n",node1.surface_accel));
	  if (!(node1.gas_giant)) {
	    output(sprintf("   Surface Gravity (in Earth gees):      %7.2f\n",node1.surface_grav));
	    if (node1.boil_point > 0.1)
		output(sprintf("   Boiling point of water (celcius):     %7.1f\n",(node1.boil_point - KELVIN_CELCIUS_DIFFERENCE)));
	    if (node1.surface_pressure > 0.00001) {
	      output(sprintf("   Surface Pressure (in atmospheres):    %7.3f",(node1.surface_pressure / 1000.0)));
	      if (node1.greenhouse_effect)
	        output(sprintf("     RUNAWAY GREENHOUSE EFFECT\n"));
	      else 
		output(sprintf("\n"));
	    }
	    output(sprintf("   Surface temperature (Celcius):        %7.2f\n",(node1.surface_temp - KELVIN_CELCIUS_DIFFERENCE)));
	       if (node1.hydrosphere > 0.01)
		   output(sprintf("   Hydrosphere percentage: %6.2f\n",(node1.hydrosphere * 100)));
	       if (node1.cloud_cover > 0.01)
		   output(sprintf("   Cloud cover percentage: %6.2f\n",(node1.cloud_cover * 100)));
	       if (node1.ice_cover > 0.01)
		   output(sprintf("   Ice cover percentage:   %6.2f\n",(node1.ice_cover * 100)));
	  }
	  output(sprintf("   Axial tilt (in degrees):   %7d\n",node1.axial_tilt));
	  output(sprintf("   Planetary albedo:          %7.3f\n",node1.albedo));
	  output(sprintf("   Length of year (in years): %7.2f\n", (node1.orbital_period / 365.25)));
	  output(sprintf("   Length of day (in hours):  %7.2f\n\n",node1.day));
	  counter++;
	  node1 = node1.next_planet;
     }
};
