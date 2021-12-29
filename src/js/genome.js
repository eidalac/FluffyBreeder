/**
 * Library that contains objects that represent genomes (a.k.a. gene strings),
 * as well as their composite genes and alleles.
 * 
 * Original code from https://github.com/armatronic
 * 
 */


/**
 * Representation of a single allele. (An allele is one half of a gene.)
 *
 * @param string name The character for the allele.
 
 function Allele(name) {
    this.name = name;
};
 */
window.Allele = function (name) {
    this.name = name;
}

/**
 * Creates an allele from a string.
 *
 * Usually, an allele is represented by a single character, but it may be any
 * string.
 *
 * @param string name The character for the allele.
 *
 * @return Allele
 */
Allele.fromString = function(name) {
    return new Allele(name);
};

/**
 * Compares this allele with another.
 *
 * @param Allele other
 *
 * @return bool
 */
Allele.prototype.equals = function(other) {
    return this.name == other.name;
};

/**
 * Returns string representation of this allele.
 *
 * @return string
 */
Allele.prototype.toString = function() {
    return this.name;
};


/**
 * Representation of a list of alleles. Usually generated from a gene string as
 * that gene's possible contributions to a breeding with another gene.
 *
 * @param array[Allele] list The list of alleles that go into this string.
 */
 window.AlleleString = function (list) {
    this.alleles = list;
    this.length = this.alleles.length;
};

/**
 * Creates allele string from a list of alleles.
 *
 * @param array[Allele] list
 *
 * @return AlleleString
 */
AlleleString.fromAlleles = function(list) {
    return new AlleleString(list);
};

/**
 * Creates allele string from a string representation.
 *
 * Alleles within a string are split with ; characters.
 *
 * @param string str
 *
 * @return AlleleString
 */
AlleleString.fromString = function(str) {
    //
    // Alleles are split by ; characters.
    var allele_list = [];
    var parts       = str.split(';');
    for (var i in parts) {
        allele_list.push(Allele.fromString(parts[i]));
    }
    return AlleleString.fromAlleles(allele_list);
};

/**
 * Creates a new genome from the breeding of this and another AlleleString.
 *
 * @param AlleleString other
 *
 * @return Genome
 */
AlleleString.prototype.breedWith = function(other) {
    return Genome.fromAlleleStrings(this, other);
};

/**
 * Retrieves the allele at position i (starting at 0).
 *
 * @param int i
 *
 * @return Allele
 */
AlleleString.prototype.elementAt = function(i) {
    return this.alleles[i];
};

/**
 * Compares this allele string to another.
 *
 * @param AlleleString other
 *
 * @return bool
 */
AlleleString.prototype.equals = function(other) {
    return this.alleles == other.alleles;
};

/**
 * Returns string representation of this allele string. Essentially, the
 * opposite of AlleleString.fromString().
 *
 * @return string
 */
AlleleString.prototype.toString = function() {
    return this.alleles.join(';');
};


/**
 * Representation of a single gene within a genome. Each gene contains a pair of
 * alleles.
 *
 * @param Allele allele1
 * @param Allele allele2
 
 function Gene(allele1, allele2) {
    this.allele1 = allele1;
    this.allele2 = allele2;
};
 */
window.Gene = function (allele1, allele2) {
    this.allele1 = allele1;
    this.allele2 = allele2;
}

/**
 * Creates a gene from two alleles.
 *
 * @param Allele allele1
 * @param Allele allele2
 *
 * @return Gene
 */
Gene.fromAlleles = function(a1, a2) {
    return new Gene(a1, a2);
};

/**
 * Creates a gene from a string.
 *
 * Alleles in a gene are split by a / character.
 *
 * @param string str
 *
 * @return Gene
 */
Gene.fromString = function(str) {
    var parts = str.split('/');
    return Gene.fromAlleles(Allele.fromString(parts[0]), Allele.fromString(parts[1]));
};

/**
 * A gene can be considered as lethal to a genome that it is a part of if its
 * alleles are equal.
 *
 * @return bool
 */
Gene.prototype.isLethal = function() {
    return this.allele1.equals(this.allele2);
};

/**
 * Compares this gene string to another.
 *
 * @param Gene other
 *
 * @return bool
 */
Gene.prototype.equals = function(other) {
    return this.allele1.equals(other.allele1) && this.allele2.equals(other.allele2);
};

/**
 * Returns string representation of this gene. Essentially, the opposite of
 * Gene.fromString().
 *
 * @return string
 */
Gene.prototype.toString = function() {
    return this.allele1.toString()+'/'+this.allele2.toString();
};


/**
 * Representation of a genome.
 *
 * @param array[Gene] genes
 Genome = function(genes) {
    this.genes = genes;
    this.length = this.genes.length;
};
 */
window.Genome = function (genes) {
    this.genes = genes;
    this.length = this.genes.length;
}

/**
 * Creates a genome from a list of genes.
 *
 * @param array[Gene] genes
 *
 * @return Genome
 */
Genome.fromGenes = function(genes) {
    return new Genome(genes);
};

/**
 * Creates a genome from two allele strings by breeding them together.
 *
 * If the allele strings are of varying length, the longer one is truncated to
 * the same length as the shorter.
 *
 * @param AlleleString string1
 * @param AlleleString string2
 *
 * @return Genome
 */
Genome.fromAlleleStrings = function(string1, string2) {

    var genes = [];
    var gene_string_length = Math.min(string1.length, string2.length);
    for (var i = 0; i < gene_string_length; i++) {
		genes[i] = Gene.fromAlleles(string1.elementAt(i), string2.elementAt(i));
    }
    return Genome.fromGenes(genes);
};

/**
 * Creates a genome from a string representation.
 *
 * Genes within the genome are split by ; characters, and alleles within each
 * gene are split by / characters.
 *
 * @param string str
 *
 * @return Genome
 
 Genome.fromString = function(str) {
    var genes = [];
    var parts = str.split(';');
    for (var i in parts) {
        genes.push(Gene.fromString(parts[i]));
    }
    return Genome.fromGenes(genes);
};
 
 */
window.Genome.fromString  = function (str) {
    var genes = [];
    var parts = str.split(';');
    for (var i in parts) {
        genes.push(Gene.fromString(parts[i]));
    }
    return Genome.fromGenes(genes);
}

/**
 * Picks one random child from this genome and another genome.
 * Building the whole punnette table is too taxing, so just pick one option gene by gene.
 *
 * @param Genome other_genome
 *
 * @return Genome
 */
Genome.prototype.breedWithGenome = function(other_genome) {
	var child_genes = "";
	var prototypeF = Genome.fromString(State.variables.grandfatherGene);
	var prototypeM = Genome.fromString(State.variables.grandmotherGene);

	//var gene_string_length = Math.min(string1.length, string2.length);

	if (prototypeF.length != this.length)
	{
		console.log("ERROR: Genome breedWithGenome: mother gene length incorrect, reset to default gene.");
		this.genes = prototypeF.genes;
	}
	else if (prototypeM.length != other_genome.length)
	{
		console.log("ERROR: Genome breedWithGenome: father gene length incorrect, reset to default gene.");
		other_genome = prototypeM;
	}

	for (var i = 0; i < this.length; i++) {
		
		if (i > 0) {
			child_genes += ";";
		}

		/* 49 is the subspecies gene, and is treated as a hex value, so we don't want to do typical breeding with it */
		if (i == 49)
		{
			/* TODO: Need to add some more special handling, but for now just copy the mom's gene for this one */
			switch (Math.floor(Math.random() * 2))
			{
				case 0:
					child_genes += other_genome.elementAt(i).allele1;
					child_genes += "/";
					child_genes += other_genome.elementAt(i).allele2;
					break;
				default:
					child_genes += this.elementAt(i).allele1;
					child_genes += "/";
					child_genes += this.elementAt(i).allele2;
					break;

			}
		}
		else
		{
			switch (Math.floor(Math.random() * 4))
			{
				case 0:
					child_genes += this.elementAt(i).allele2;
					child_genes += "/";
					child_genes += other_genome.elementAt(i).allele2;
					break;
				case 1:
					child_genes += this.elementAt(i).allele2;
					child_genes += "/";
					child_genes += other_genome.elementAt(i).allele1;
					break;
				case 2:
					child_genes += this.elementAt(i).allele1;
					child_genes += "/";
					child_genes += other_genome.elementAt(i).allele2;
					break;
				default:
					child_genes += this.elementAt(i).allele1;
					child_genes += "/";
					child_genes += other_genome.elementAt(i).allele1;
					break;
			}
		}
	}

    return Genome.fromString(child_genes); 
}


/**
 * Retrieves the gene at position i (starting at 0).
 *
 * @param int i
 *
 * @return Gene
 */
Genome.prototype.elementAt = function(i) {
    return this.genes[i];
};


/**
 * Comparison for whether this genome is the same as another.
 *
 * @return bool
 */
Genome.prototype.equals = function(other) {
    if (this.length != other.length) {
        return false;
    }
    var gene_string_length = Math.min(this.length, other.length);
    for (var i = 0; i < gene_string_length; i++) {
        if (!(this.elementAt(i).equals(other.elementAt(i)))) {
            return false;
        }
    }
    return true;
};

/**
 * Returns a string representation of this genome.
 *
 * @return string
 */
Genome.prototype.toString = function() {
    return this.genes.join(';');
};


/********************************************************************************************
 * Fluffy Specific Gene Code
 ********************************************************************************************/


/**
 * Retrieves the gene determining gender.
 *
 * This is defined as the first gene (0), X\X or X\Y.
 *
 * @return Gene
 */
Genome.prototype.getGender = function() {
	return Genome.fromString(this.elementAt(0).toString());
};

/**
 * Retrieves returns a string name for the gender gene.
 *
 * @return String
 */
Genome.prototype.getGenderString = function() {
	if (this.getGender().toString() == "X/X") {
		return "Female";
	}
	
	if (this.getGender().toString() == "X/Y") {
		return "Male";
	}

	/* If it's Y/Y or somethign else, just force it to male (male has been the default display if it's not X/X: */
	this.setGender("Male");
	return "Male";
};

/**
 * Retrieves the gene determining adult size (length).
 *
 * This is defined as genes 1, 2 and 3 (A/a;B/b;C/c).
 *
 * @return Genome
 */
Genome.prototype.getLength = function() {
	return Genome.fromString(this.elementAt(1).toString() + ";" + this.elementAt(2).toString() +";" + this.elementAt(3).toString());
};

/**
 * Sets the gender gene to male or female (used for random generation).
 *
 * @param string new_gender string of either Male or Female, X/X or X/Y.
 */
Genome.prototype.setGender = function(new_gender) {
	new_gender = new_gender.toLowerCase();
	
	if (new_gender == "male") {
		this.genes[0] = Gene.fromString("X/Y");
	} else {
		this.genes[0] = Gene.fromString("X/X");
	}
};



/**
 * Returns the Phenotype details for a gene triplet
 * Called when no genes are co-dominate, currently only used for the Length gene
 *
 * @param int index the index location of the first of the gene pair
 * @param string gene_string the letters of this gene, in the format "A/B/C"
 *  (where the genes would have the "A/a;B/b;C/c" pattern)
 * 
 * @return int
 */
Genome.prototype.triplePhenotype = function(index, gene_string) {
	
	// booleans for the possible matches, set to false to start.
	var domOne = false;
	var domTwo = false;
	var domThree = false;
	
	// Get the three letters we are looking for
	var parts = gene_string.split('/');
	
	// Make them all upper case to start, so we have {[A], [B], [C]}
	parts[0] = parts[0].toUpperCase();
	parts[1] = parts[1].toUpperCase();
	parts[2] = parts[2].toUpperCase();
	
	// Get the genes
	var geneOne = this.elementAt(index).toString().split('/');		// {[A], [a]}
	var geneTwo = this.elementAt(index+1).toString().split('/');	// {[B], [b]}
	var geneThree = this.elementAt(index+2).toString().split('/');	// {[C], [c]}
	
	/**
	 * Combinations are:
	 * A/A, A/a, a/A, a/a and B/B, B/b, b/B, b/b
	 * **/

	// Check for any genes that do not match the profile
	if (!parts.includes(geneOne[0].toUpperCase()) || !parts.includes(geneOne[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneTwo[0].toUpperCase()) || !parts.includes(geneTwo[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneThree[0].toUpperCase()) || !parts.includes(geneThree[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneOne[1].toUpperCase()) || !parts.includes(geneOne[1].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneTwo[1].toUpperCase()) || !parts.includes(geneTwo[1].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneThree[1].toUpperCase()) || !parts.includes(geneThree[1].toUpperCase())) {
		return -1;
	}

	// We only care if 1) one is A or 2) both are a (2 is default, so we only need to test for 1)
	if (parts[0] == geneOne[0] || parts[0] == geneOne[1]) {
		// since parts[0] is upper, we know one or the other aleale is uppercase
		domOne = true;
	}
	
	// Same for B in this case
	if (parts[1] == geneTwo[0] || parts[1] == geneTwo[1]) {
		// since parts[1] is upper, we know one or the other aleale is uppercase
		domTwo = true;
	}
	
	// Same for C in this case
	if (parts[2] == domThree[0] || parts[2] == domThree[1]) {
		// since parts[2] is upper, we know one or the other aleale is uppercase
		domTwo = true;
	}
	
	if (domOne && !domTwo && !domThree) {
		return 0;
	}
	if (!domOne && domTwo && !domThree) {
		return 1;
	}
	if (!domOne && domTwo && domThree) {
		return 2;
	}
	if (domOne && domTwo && domThree) {
		return 3;
	}
	if (domOne && domTwo && !domThree) {
		return 4;
	}
	if (domOne && !domTwo && domThree) {
		return 5;
	}
	if (!domOne && !domTwo && domThree) {
		return 6;
	}
	if (!domOne && !domTwo && !domThree) {
		return 7;
	}
	return -1;
};

/**
 * Retrieves returns the index the length gene codes to.
 * The gene starts at location 1, and has the format "A/a;B/b;C/c".
 * 
 * There are 8 phenotype combinations
 * 
 * Genes		Index	Base Value
 * [ A b c ]     0		39 + random(0,1)
 * [ a B c ]     1		37 + random(0,1)
 * [ a B C ]     2		35 + random(0,1)
 * [ A B C ]     3		33 + random(0,1)
 * [ A B c ]     4		31 + random(0,1)
 * [ A b C ]     5		29 + random(0,1)
 * [ a b C ]     6		27 + random(0,1)
 * [ a b c ]     7		25 + random(0,1)
 *
 * @return Int
 */
Genome.prototype.getLength = function() {
	switch (this.triplePhenotype(1, "A/B/C")) {
	case 0:
		return 39;
	case 1:
		return 37;
	case 2:
		return 35;
	case 3:
		return 33;
	case 4:
		return 31;
	case 5:
		return 29;
	case 6:
		return 27;
	case 7:
		return 25;
	default:
		return -1;
	}
}

/**length
 * Retrieves the gene determining adult size (length).
 *
 * This is defined as genes 1, 2 and 3 (A/a;B/b;C/c).
 *
 * @return Genome
 */
Genome.prototype.getLengthGene = function() {
	return Genome.fromString(this.elementAt(1).toString() + ";" + this.elementAt(2).toString() + ";" + this.elementAt(3).toString());
};

/**
 * Sets the Length gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setLength = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);

	switch (test_gene.triplePhenotype(0, "A/B/C")) {
	case -1:
		 // gene string does not match, abort.

		return false;
	default:
		// we matched a valid gene, continue.

		this.genes[1] = new_gene.substring(0, 3);
		this.genes[2] = new_gene.substring(4, 7);
		this.genes[3] = new_gene.substring(8, 11);
		return true;
	}
};

/**
 * Retrieves returns a string name for the size (length) gene.
 *
 * @return String
 */
Genome.prototype.getLengthDesc = function() {
	switch (this.getLength()) {
	case 39:
		return "Longest (39-40 cm)";
	case 37:
		return "Longer (37-38 cm)";
	case 35:
		return "Longer (35-36 cm)";
	case 33:
		return "Average (33-34 cm)";
	case 31:
		return "Short (31-32 cm)";
	case 29:
		return "Shorter (29-30 cm)";
	case 27:
		return "Shorter (27-28 cm)";
	case 25:
		return "Shortest (25-26 cm)";
	default:
		return "UNDEFINED SIZE (LENGTH)";
	}
};


/**
 * Returns the Phenotype details for a gene pair
 *
 * @param int index the index location of the first of the gene pair 
 * @param string gene_string the two letters of this gene, in the format "A/B"
 *  (where the genes would have the "A/a;B/b" pattern)
 * 
 * @return int
 */
Genome.prototype.doublePhenotype = function(index, gene_string) {
	
	// booleans for the possible matches, set to false to start.
	var domOne = false;
	var recOne = false;
	var domTwo = false;
	var recTwo = false;
	
	// Get the two letters we are looking for
	var parts = gene_string.split('/');
	
	// Make them both upper case to start, so we have {[A], [B]}
	parts[0] = parts[0].toUpperCase();
	parts[1] = parts[1].toUpperCase();
	
	// Get the genes, sort them so upper case is first.
	var geneOne = this.elementAt(index).toString().split('/').sort().reverse();			// {[A], [a]}
	var geneTwo = this.elementAt(index+1).toString().split('/').sort().reverse();		// {[B], [b]}
	
	/**
	 * Combinations are:
	 * A/A, A/a, a/A, a/a and B/B, B/b, b/B, b/b
	 * **/
	// Check for any genes that do not match the profile
	if (!parts.includes(geneOne[0].toUpperCase()) || !parts.includes(geneOne[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneTwo[0].toUpperCase()) || !parts.includes(geneTwo[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneOne[1].toUpperCase()) || !parts.includes(geneOne[1].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneTwo[1].toUpperCase()) || !parts.includes(geneTwo[1].toUpperCase())) {
		return -1;
	}
	
	// default is mixed case, so just check if both are upper case or both are lower:
	if (parts[0] == geneOne[0] && parts[0] == geneOne[1]) {
		// Both upper case.
		domOne = true;
	} else if (geneOne[0] == geneOne[1]) {
		// Both are Lower case
		recOne = true;
	}

	// default is mixed case, so just check if both are upper case or both are lower:
	if (parts[1] == geneTwo[0] && parts[1] == geneTwo[1]) {
		// Both upper case.
		domTwo = true;
	} else if (geneTwo[0] == geneTwo[1]) {
		// Both are Lower case
		recTwo = true;
	}
	
	if (recOne && recTwo) {
		return 0;
	}
	if (!recOne && domTwo) {
		return 1;
	}
	if (!recOne && !domTwo && !recTwo) {
		return 2;
	}
	if (!recOne && recTwo) {
		return 3;
	}
	if (recOne && !domTwo && !recTwo) {
		return 4;
	}
	if (recOne && domTwo) {
		return 5;
	}
	
	return -1;
};


/**
 * Retrieves the gene determining adult size (Height).
 * This is defined as genes 4 and 5 (E/e;F/f).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Genes		Index	base value
 * [ e f  ]     0		(65 + random(0,1))/100
 * [ E F  ]     1		(62 + random(0,1))/100
 * [ E fF ]     2		(59 + random(0,1))/100
 * [ E f  ]     3		(56 + random(0,1))/100
 * [ e fF ]     4		(53 + random(0,1))/100
 * [ e F  ]     5		(50 + random(0,1))/100
 *
 * @return Int
 */
Genome.prototype.getHeight = function() {
	switch (this.doublePhenotype(4, "E/F")) {
	case 0:
		return 0.65;
	case 1:
		return 0.62;
	case 2:
		return 0.59;
	case 3:
		return 0.56;
	case 4:
		return 0.53;
	case 5:
		return 0.50;
	default:
		return -1;
	}
}

/**
 * Sets the Height gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setHeight = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);

	switch (test_gene.doublePhenotype(0, "E/F")) {
	case -1:
		 // gene string does not match, abort.

		return false;
	default:
		// we matched a valid gene, continue.

		this.genes[4] = new_gene.substring(0, 3);
		this.genes[5] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining adult size (Height).
 * This is defined as genes 4 and 5 (E/e;F/f).
 *
 * @return Genome
 */
Genome.prototype.getHeightGene = function() {
	return Genome.fromString(this.elementAt(4).toString() + ";" + this.elementAt(5).toString());
};

/**
 * Retrieves returns a string name for the size (Height) gene.
 *
 * This is defined as genes 4 and 5 (E/e;F/f).
 * 
 * E is dominate over e, F/f are non-dominate to each other.
 *
 * @return String
 */
Genome.prototype.getHeightDesc = function() {
	switch (this.getHeight()) {
	case 0.65:
		return "Tallest (0.65-0.67 multiplier)";
	case 0.62:
		return "Taller (0.62-0.64 multiplier)";
	case 0.59:
		return "Average (0.59-0.61 multiplier)";
	case 0.56:
		return "Shorter (0.56-0.58 multiplier)";
	case 0.53:
		return "Shorter (0.53-0.55 multiplier)";
	case 0.50:
		return "Shortest (0.50-0.52 multiplier)";
	default:
		return "UNDEFINED SIZE (HEIGHT)";
	}
};

/**
 * Retrieves the gene determining adult size (Weight).
 * This is defined as genes 6 and 7 (G/g;H/h).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Genes		Index	base value
 * [ g h  ]     0		0.105
 * [ G H  ]     1		0.100
 * [ G hH ]     2		0.095
 * [ G h  ]     3		0.090
 * [ g hH ]     4		0.085
 * [ g H  ]     5		0.080
 *
 * @return Int
 */
Genome.prototype.getWeight = function() {
	switch (this.doublePhenotype(6, "G/H")) {
	case 0:
		return 0.105;
	case 1:
		return 0.100;
	case 2:
		return 0.095;
	case 3:
		return 0.090;
	case 4:
		return 0.085;
	case 5:
		return 0.080;
	default:
		return -1;
	}
}


/**
 * Sets the Weight gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setWeight = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "G/H")) {
	case -1:
		return false;
	default:
		this.genes[6] = new_gene.substring(0, 3);
		this.genes[7] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining adult Weight
 *
 * This is defined as genes 6 and 7 (G/g;H/h).
 *
 * @return Genome
 */
Genome.prototype.getWeightGene = function() {
	return Genome.fromString(this.elementAt(6).toString() + ";" + this.elementAt(7).toString());
};

/**
 * Retrieves returns a string name for the Weight gene.
 *
 * G is dominate over g, H/h are non-dominate to each other.
 *
 * @return String
 */
Genome.prototype.getWeightDesc = function() {
	switch (this.getWeight()) {
	case 0.105:
		return "Heavest (0.105)";
	case 0.100:
		return "Heavier (01.00)";
	case 0.095:
		return "Average (0.095)";
	case 0.090:
		return "Lighter (0.090)";
	case 0.085:
		return "Lighter (0.085)";
	case 0.080:
		return "Lightest (0.080)";
	default:
		return "UNDEFINED SIZE (WEIGHT)";
	}
};

/**
 * Retrieves the gene determining adult max Age.
 * This is defined as genes 8 and 9 (J/j;K/k).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Lifespan:
 * JjKk
 * Phenotype	Index	Count	Percent	Age
 * j  k			0		1		6.3		12
 * J  K			1		3		18.8	11
 * J  kK		2		6		37.5	10
 * J  k			3		3		18.8	9
 * j  kK		4		2		12.5	8
 * j  K			5		1		6.3 	7	
 *
 *
 * @return Int
 */
Genome.prototype.getMaxAge = function() {
	switch (this.doublePhenotype(8, "J/K")) {
	case 0:
		return 12;
	case 1:
		return 11;
	case 2:
		return 10;
	case 3:
		return 9;
	case 4:
		return 8;
	case 5:
		return 7;
	default:
		return -1;
	}
}

/**
 * Sets the Age gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setMaxAge = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "J/K")) {
	case -1:
		return false;
	default:
		this.genes[8] = new_gene.substring(0, 3);
		this.genes[9] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining maximum age
 *
 * This is defined as genes 8 and 9 (J/j;K/k).
 *
 * @return Genome
 */
Genome.prototype.getMaxAgeGene = function() {
	return Genome.fromString(this.elementAt(8).toString() + ";" + this.elementAt(9).toString());
};

/**
 * Retrieves returns a string name for the Age gene.
 *
 * @return String
 */
Genome.prototype.getMaxAgeDesc = function() {
	switch (this.getMaxAge()) {
	case 12:
		return "Oldest (12)";
	case 11:
		return "Older (11)";
	case 10:
		return "Average (10)";
	case 9:
		return "Younger (9)";
	case 8:
		return "Younger (8)";
	case 7:
		return "Youngest (7)";
	default:
		return "UNDEFINED AGE [" + this.getMaxAge() + "]";
	}
};

/**
 * Retrieves the gene determining adult fertility.
 * This is defined as genes 10 and 11 (M/n;N/n).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Fertility:
 * MmNn
 * Phenotype	Index	Count	Percent	Litter	Mlik (ml)
 * m  n			0		1		6.3		2-3		200-400
 * M  N			1		3		18.8	3-4		300-500
 * M  nN		2		6		37.5	4-5		400-700
 * M  n			3		3		18.8	5-6		500-800
 * m  nN		4		2		12.5	6-7		700-1000
 * m  N			5		1		6.3 	7-8		800-1100	
 *
 * @return Int
 */
Genome.prototype.getFertility = function() {
	switch (this.doublePhenotype(10, "M/N")) {
	case 0:
		return 2;
	case 1:
		return 3;
	case 2:
		return 4;
	case 3:
		return 5;
	case 4:
		return 6;
	case 5:
		return 7;
	default:
		return -1;
	}
}

/**
 * Retrieves the gene determining fertility
 *
 * This is defined as genes 10 and 11 (M/n;N/n).
 *
 * @return Genome
 */
Genome.prototype.getFertilityGene = function() {
	return Genome.fromString(this.elementAt(10).toString() + ";" + this.elementAt(11).toString());
};

/**
 * Retrieves returns a string name for the fertility gene.
 *
 * @return String
 */
Genome.prototype.getFertilityDesc = function() {
	switch (this.getFertility()) {
	case 2:
		return "2";
	case 3:
		return "3";
	case 4:
		return "4";
	case 5:
		return "5";
	case 6:
		return "6";
	case 7:
		return "7";
	default:
		return "UNDEFINED FERTILITY [" + this.getFertility() + "]";
	}
};

/**
 * Sets the Fertility gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setFertility = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "M/N")) {
	case -1:
		return false;
	default:
		this.genes[10] = new_gene.substring(0, 3);
		this.genes[11] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining age of maturity.
 * This is defined as genes 12 and 13 (S/s;X/x).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Maturity:
 * SsXx
 * Phenotype	Index	Count	Percent	Age (weeks)
 * s  s			0		1		6.3		36-37
 * S  S			1		3		18.8	38-39
 * S  sS		2		6		37.5	40-41
 * S  s			3		3		18.8	42-43
 * s  sS		4		2		12.5	44-45
 * s  S			5		1		6.3 	46-47
 *
 * @return Int
 */
Genome.prototype.getMaturity = function() {
	switch (this.doublePhenotype(12, "S/X")) {
	case 0:
		return 36;
	case 1:
		return 38;
	case 2:
		return 40;
	case 3:
		return 42;
	case 4:
		return 44;
	case 5:
		return 46;
	default:
		return -1;
	}
}

/**
 * Sets the Maturity gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setMaturity = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "S/X")) {
	case -1:
		return false;
	default:
		this.genes[12] = new_gene.substring(0, 3);
		this.genes[13] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining Maturity
 *
 * This is defined as genes 12 and 13 (S/s;X/x).
 *
 * @return Genome
 */
Genome.prototype.getMaturityGene = function() {
	return Genome.fromString(this.elementAt(12).toString() + ";" + this.elementAt(13).toString());
};

/**
 * Retrieves returns a string name for the Maturity gene.
 *
 * @return String
 */
Genome.prototype.getMaturityDesc = function() {
	switch (this.getMaturity()) {
	case 36:
		return "36";
	case 38:
		return "38";
	case 40:
		return "40";
	case 42:
		return "42";
	case 44:
		return "44";
	case 46:
		return "46";
	default:
		return "UNDEFINED MATURITY";
	}
};

/**
 * Retrieves the gene determining Breed
 *
 * This is defined as genes 14 and 15, 16 (E/e;P/a;U/a).
 *
 * @return Genome
 */
Genome.prototype.getBreed = function() {
	return Genome.fromString(this.elementAt(14).toString() + ";" + this.elementAt(15).toString() + ";" + this.elementAt(16).toString());
};


/**
 * Returns the Phenotype details for a gene triplet for the breed gene
 * This is a special case, as there are mutliple recesive genes involved.
 * The gene pattern is "E/e;P/a;U/a"
 *
 * @param int index the index location of the first of the gene pair
 * @param string gene_string the letters of this gene
 * 
 * @return int
 */
Genome.prototype.breedPhenotype = function(index, gene_string) {
	
	// booleans for the possible matches, set to false to start.
	var domOne = false;
	var domTwo = false;
	var domThree = false;

	// Get the three letters we are looking for
	var parts = gene_string.split('/');
	
	// Make sure the first 3 are upper case, but the last can be left lower, so we have {[E], [P], [U], [a]}
	parts[0] = parts[0].toUpperCase();
	parts[1] = parts[1].toUpperCase();
	parts[2] = parts[2].toUpperCase();
	parts[3] = parts[3].toUpperCase();
	
	// Get the genes
	var geneOne = this.elementAt(index).toString().split('/');		// {[E], [e]}
	var geneTwo = this.elementAt(index+1).toString().split('/');	// {[P], [a]}
	var geneThree = this.elementAt(index+2).toString().split('/');	// {[U], [a]}

	
	if (!parts.includes(geneOne[0].toUpperCase()) || !parts.includes(geneOne[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneTwo[0].toUpperCase()) || !parts.includes(geneTwo[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneThree[0].toUpperCase()) || !parts.includes(geneThree[0].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneOne[1].toUpperCase()) || !parts.includes(geneOne[1].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneTwo[1].toUpperCase()) || !parts.includes(geneTwo[1].toUpperCase())) {
		return -1;
	}
	if (!parts.includes(geneThree[1].toUpperCase()) || !parts.includes(geneThree[1].toUpperCase())) {
		return -1;
	}
	
	// We need this upper for the check above, but lower case otherwise.  it's complicated.  this is all so very complicated.
	parts[3] = parts[3].toLowerCase();
	
	// Two of these are only upper case, one is only lower, and only one can be in either state.
	
	// Check the first gene, if either is upper case it's dominate
	if (parts[0] == geneOne[0] || parts[0] == geneOne[1]) {
		// since parts[0] is upper, we know one or the other aleale is uppercase
		domOne = true;
	}
	
	// For the others, we need to check if either is Dominate or if both are the recessive trait
	if (parts[1] == geneTwo[0] || parts[1] == geneTwo[1]) {
		// If either of those match, we know it's not a double recesive
		domTwo = true;
	}
	if (parts[2] == geneThree[0] || parts[2] == geneThree[1]) {
		// If either of those match, we know it's not a double recesive
		domThree = true;
	}

	/**
	 * There are 8 phenotype combinations
	 * 
	 * for Fluffy genes, they are indexed as:
	 * 
	 * Genes		Index
	 * [ E P U ]     0
	 * [ E P a ]     1
	 * [ E a U ]     2
	 * [ e P U ]     3
	 * [ E a a ]     4
	 * [ e P a ]     5
	 * [ e a U ]     6
	 * [ e a a ]     7
	 * **/
	
	if (domOne && domTwo && domThree) {
		return 0;
	}
	if (domOne && domTwo && !domThree) {
		return 1;
	}
	if (domOne && !domTwo && domThree) {
		return 2;
	}
	if (!domOne && domTwo && domThree) {
		return 3;
	}
	if (domOne && !domTwo && !domThree) {
		return 4;
	}
	if (!domOne && domTwo && !domThree) {
		return 5;
	}
	if (!domOne && !domTwo && domThree) {
		return 6;
	}
	if (!domOne && !domTwo && !domThree) {
		return 7;
	}
	return -1;
};

/**
 * Retrieves returns a string name for the Breed gene.
 *
 * This is a special case, as there are mutliple recesive genes involved.
 * The gene pattern is "E/e;P/a;U/a"
 *
 * @return String
 */
Genome.prototype.getBreedString = function() {
	switch (this.breedPhenotype(14, "E/P/U/a")) {
	case 0:
		return "Earthy";
	case 1:
		return "Pegasus";
	case 2:
		return "Unicorn";
	case 3:
		return "SETTING_DEPENDENT_BREED";
	case 4:
		return "Earthy";
	case 5:
		return "Pegasus";
	case 6:
		return "Unicorn";
	case 7:
		return "Alicorn";
	default:
		return "UNDEFINED BREED";
	}
};

/**
 * Sets the Breed gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setBreed = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.breedPhenotype(0, "E/P/U/a")) {
	case -1:
		return false;
	default:
		this.genes[14] = new_gene.substring(0, 3);
		this.genes[15] = new_gene.substring(4, 7);
		this.genes[16] = new_gene.substring(8, 11);
		return true;
	}
};


/******************************************************
 * COLOR SHIT THIS IS GOING TO BE LARGE 
 *******************************************************/

 const valueIndex = [
	{	string: 'ccww', value: 0  },
	{	string: 'ccwW', value: 28 },
	{	string: 'ccWW', value: 58 },
	{	string: 'cCww', value: 87 },
	{	string: 'cCwW', value: 116 },
	{	string: 'cCWW', value: 145 },
	{	string: 'CCww', value: 174 },
	{	string: 'CCwW', value: 203 },
	{	string: 'CCWW', value: 232 }
];


/**
 * Retrieves returns a string name for the coat color gene
 *
 * @return Object
 */
 Genome.prototype.newCoatColorObject = function() {
	return this.getNewGeneColor(17);
}

/**
 * Retrieves returns a string name for the mane color gene
 *
 * @return Object
 */
Genome.prototype.newManeColorObject = function() {
	return this.getNewGeneColor(22);
}

/**
 * Retrieves returns a string name for the eye color gene
 *
 * @return Object
 */
Genome.prototype.newEyeColorObject = function() {
	return this.getNewGeneColor(27);
}


/**
 * Retrieves the color code from this gene set with a new system.
 * Gene pattern is (B/b;Y/y;R/r;O/o;W/w).
 * 
 * @param int index index of the first gene in the sequence
 *
 * @return String
 */
Genome.prototype.getNewGeneColor = function(index) {
	// clear up the string
	var geneOne = this.elementAt(index).toString().split('/');		// {[B], [b]}
	var geneTwo = this.elementAt(index+1).toString().split('/');	// {[Y], [y]}
	var geneThree = this.elementAt(index+2).toString().split('/');	// {[R], [r]}
	var geneFour = this.elementAt(index+3).toString().split('/');	// {[O], [o]}
	var geneFive = this.elementAt(index+4).toString().split('/');	// {[W], [w]}
	
	var geneString = "";
	
	// Sort it so we can get an exact match to the combination, not the order, of each pair:
	geneOne = geneOne.sort().reverse();
	geneTwo = geneTwo.sort().reverse();
	geneThree = geneThree.sort().reverse();
	geneFour = geneFour.sort().reverse();
	geneFive = geneFive.sort().reverse();
	
	// build a clean string with no seperators:
	geneString += geneOne[0];
	geneString += geneOne[1];
	geneString += geneTwo[0];
	geneString += geneTwo[1];
	geneString += geneThree[0];
	geneString += geneThree[1];
	geneString += geneFour[0];
	geneString += geneFour[1];
	
	var wFactor = "";
	
	wFactor += geneFive[0];
	wFactor += geneFive[1];

	var bFactor = geneOne[0] + geneOne[1] + wFactor;
	var yFactor = geneTwo[0] + geneTwo[1] + wFactor;
	var rFactor = geneThree[0] + geneThree[1] + wFactor;
	var oFactor = geneFour[0] + geneFour[1];

	var hexOne = -1;
	var hexTwo = -1;
	var hexThree = -1;

	console.log(`DEBUG: getNewGeneColor(): bFactor =  ${bFactor}.`);
	console.log(`DEBUG: getNewGeneColor(): yFactor =  ${yFactor}.`);
	console.log(`DEBUG: getNewGeneColor(): rFactor =  ${rFactor}.`);

    for (let i in valueIndex) {
        let bIndex = valueIndex[i].string.replaceAll(/c/g, 'b');
		bIndex = bIndex.replaceAll(/C/g, 'B');
        let yIndex = valueIndex[i].string.replaceAll(/c/g, 'y');
		yIndex = yIndex.replaceAll(/C/g, 'Y');
        let rIndex = valueIndex[i].string.replaceAll(/c/g, 'r');
		rIndex = rIndex.replaceAll(/C/g, 'R');

	/*	console.log(`DEBUG: getNewGeneColor(): bIndex =  ${bIndex}.`);

		console.log(`DEBUG: getNewGeneColor(): yIndex =  ${yIndex}.`);
	
		console.log(`DEBUG: getNewGeneColor(): rIndex =  ${rIndex}.`);
	*/	

		if (bFactor === bIndex)
		{
			hexOne = valueIndex[i].value;
	//		console.log(`DEBUG: getNewGeneColor(): hexOne =  ${hexOne}.`);
		}
		if (yFactor === yIndex)
		{
			hexTwo = valueIndex[i].value;
	//		console.log(`DEBUG: getNewGeneColor(): hexTwo =  ${hexTwo}.`);
		}
		if (rFactor === rIndex)
		{
			hexThree = valueIndex[i].value;
	//		console.log(`DEBUG: getNewGeneColor(): hexThree =  ${hexThree}.`);
		}

		if (hexOne + hexTwo + hexThree >= 0)
		{
			break;
		}
	}

	if (oFactor === "oO")
	{
		hexOne -= 10;
		hexTwo -= 20;
		hexThree -= 20;
	}
	else if (oFactor === "oo")
	{
		hexOne -= 20;
		hexTwo -= 40;
		hexThree -= 40;
	}

	if (hexOne < 0)
	{
		hexOne = 0;
	}
	if (hexTwo < 0)
	{
		hexTwo = 0;
	}
	if (hexThree < 0)
	{
		hexThree = 0;
	}

	var hexString = "";
	//console.log(`DEBUG: getNewGeneColor(): hexString =  ${hexString}, ${hexOne}.`);
	hexString = hexOne.toString(16).length === 1 ? '0' + hexOne.toString(16) : hexOne.toString(16);

	//console.log(`DEBUG: getNewGeneColor(): hexString =  ${hexString}, ${hexTwo}.`);

	hexString += hexTwo.toString(16).length === 1 ? '0' + hexTwo.toString(16) : hexTwo.toString(16); 
	//console.log(`DEBUG: getNewGeneColor(): hexString =  ${hexString}, ${hexThree}.`);
	
	hexString += hexThree.toString(16).length === 1 ? '0' + hexThree.toString(16) : hexThree.toString(16);
	//console.log(`DEBUG: getNewGeneColor(): hexString =  ${hexString}.`);

	const colors = window.colorList
	let geneObject;
	hexString = '#577597'
	const colorFilter = hexToFilter(hexString)
	let deltaArr = []

	// Iterate through all colors and compare geneString
	for (let color in colors) {
		deltaArr.push(hexColorDelta(hexString, colors[color].hex))
	}

	// Check which existing color most matches generated color
	const closest = closestIndex(1, deltaArr);
	geneObject = { name: colors[closest].name, hex: colors[closest].hex, filter:  colorFilter}

	return geneObject;
}

/**
 * Retrieves the color code from this gene set.
 * Gene pattern is (B/b;Y/y;R/r;O/o;W/w).
 * there are over 81 base combiations
 * some are hand picked so this will be done as a massive coded list.
 * 
 * @param int index index of the first gene in the sequence
 *
 * @return String
 */
Genome.prototype.getGeneColor = function(index) {
	// clear up the string
	var geneOne = this.elementAt(index).toString().split('/');		// {[B], [b]}
	var geneTwo = this.elementAt(index+1).toString().split('/');	// {[Y], [y]}
	var geneThree = this.elementAt(index+2).toString().split('/');	// {[R], [r]}
	var geneFour = this.elementAt(index+3).toString().split('/');	// {[O], [o]}
	var geneFive = this.elementAt(index+4).toString().split('/');	// {[W], [w]}
	
	var geneString = "";
	
	// Sort it so we can get an exact match to the combination, not the order, of each pair:
	geneOne = geneOne.sort().reverse();
	geneTwo = geneTwo.sort().reverse();
	geneThree = geneThree.sort().reverse();
	geneFour = geneFour.sort().reverse();
	geneFive = geneFive.sort().reverse();
	
	// build a clean string with no seperators:
	geneString += geneOne[0];
	geneString += geneOne[1];
	geneString += geneTwo[0];
	geneString += geneTwo[1];
	geneString += geneThree[0];
	geneString += geneThree[1];
	geneString += geneFour[0];
	geneString += geneFour[1];
	
	var Results = "";
	
	Results += geneFive[0];
	Results += geneFive[1];
	
	// check for Melanism/Albinism
	if (geneString == "BBYYRROO" && Results == "WW") {
		return "Black";
	}
	
	if (geneString == "bbyyrroo" && Results == "ww") {
		// eyes
		if (index == 27)
			return "Pink";
		else
			return "White";
	}
	
	const colors = State.variables.colors
	let missing = false
	let geneObject;

	// Iterate through all colors and compare geneString
	for (let color in colors) {
		const colorGene = colors[color].gene.replaceAll(/[\/;]/g, '')

		if (geneString === colorGene) {
			geneObject = {name: colors[color].name, hex: "#FF9900"}
			missing = false;
		} else if (geneObject.name.toLowerCase() === colorGene.toLowerCase()) {
			missing = true;
		}
	}

	// If gene has no color, but is correct format
	if (missing) {
		const random = Math.floor(Math.random() * colors.length-1)
		const random_color = colors[random].name;
		geneObject = {name: random_color, hex: "#FF9900"}
	}

	// now the bastard monster switch
	// switch (geneString) {
	// case "bByyrRoO":
	// 	geneString = "Gold";
	// 	break;
	// case "bBYYrrOO":
	// 	geneString = "Lavender";
	// 	break;
	// case "bByyrroO":
	// 	geneString = "CornflowerBlue";
	// 	break;
	// case "BByYrROO":
	// 	geneString = "CornflowerBlue";
	// 	break;
	// case "bByYRROO":
	// 	geneString = "MidnightBlue";
	// 	break;
	// case "bBYYRRoo":
	// 	geneString = "Orchid";
	// 	break;
	// case "bbyyrROO":
	// 	geneString = "PeachPuff";
	// 	break;
	// case "bByyrROO":
	// 	geneString = "YellowGreen";
	// 	break;
	// case "BByYrRoO":
	// 	geneString = "GreenYellow";
	// 	break;
	// case "bbyyrroO":
	// 	geneString = "Chartreuse";
	// 	break;
	// case "bbyyrrOO":
	// 	geneString = "OliveDrab";
	// 	break;
	// case "bbyYrRoO":
	// 	geneString = "Moccasin";
	// 	break;
	// case "BByyrROO":
	// 	geneString = "Yellow";
	// 	break;
	// case "bbyYrroo":
	// 	geneString = "Khaki";
	// 	break;
	// case "bbYYrroo":
	// 	geneString = "PaleGoldenRod";
	// 	break;
	// case "bByyrRoo":
	// 	geneString = "Thistle";
	// 	break;
	// case "bByYrRoO":
	// 	geneString = "Violet";
	// 	break;
	// case "bBYYrROO":
	// 	geneString = "RebeccaPurple";
	// 	break;
	// case "bBYYrroO":
	// 	geneString = "Plum";
	// 	break;
	// case "bByYrRoo":
	// 	geneString = "Purple";
	// 	break;
	// case "bBYYRRoO":
	// 	geneString = "PaleVioletRed";
	// 	break;
	// case "bBYYRROO":
	// 	geneString = "Fuchsia";
	// 	break;
	// case "bBYYrRoO":
	// 	geneString = "OrangeRed";
	// 	break;
	// case "BBYYrRoO":
	// 	geneString = "Tomato";
	// 	break;
	// case "bbyyrroo":
	// 	geneString = "Chocolate";
	// 	break;
	// case "bBYYrRoo":
	// 	geneString = "Red";
	// 	break;
	// case "BByYrRoo":
	// 	geneString = "FireBrick";
	// 	break;
	// case "BBYYrRoo":
	// 	geneString = "Crimson";
	// 	break;
	// case "BByyrRoo":
	// 	geneString = "IndianRed";
	// 	break;
	// case "BByyrRoO":
	// 	geneString = "Salmon";
	// 	break;
	// case "BByYRRoO":
	// 	geneString = "LightCoral";
	// 	break;
	// case "BBYYRRoO":
	// 	geneString = "DarkSalmon";
	// 	break;
	// case "BByYRROO":
	// 	geneString = "Red";
	// 	break;
	// case "BByyRRoO":
	// 	geneString = "Maroon";
	// 	break;
	// case "BBYYRROO":
	// 	geneString = "MediumVioletRed";
	// 	break;
	// case "BBYYRRoo":
	// 	geneString = "DeepPink";
	// 	break;
	// case "BByyRROO":
	// 	geneString = "HotPink";
	// 	break;
	// case "BByyRRoo":
	// 	geneString = "Pink";
	// 	break;
	// case "bbyyrRoo":
	// 	geneString = "Tomato";
	// 	break;
	// case "bbyyrRoO":
	// 	geneString = "Coral";
	// 	break;
	// case "BByYRRoo":
	// 	geneString = "Orange";
	// 	break;
	// case "bbyyRRoO":
	// 	geneString = "Orange";
	// 	break;
	// case "bbyyRROO":
	// 	geneString = "Orange";
	// 	break;
	// case "bbyyRRoo":
	// 	geneString = "Orange";
	// 	break;
	// case "bByYrROO":
	// 	geneString = "SpringGreen";
	// 	break;
	// case "bbyYrroO":
	// 	geneString = "OliveDrab";
	// 	break;
	// case "bbYYrroO":
	// 	geneString = "SeaGreen";
	// 	break;
	// case "bbyYrrOO":
	// 	geneString = "ForestGreen";
	// 	break;
	// case "bbYYrrOO":
	// 	geneString = "Green";
	// 	break;
	// case "bByyrroo":
	// 	geneString = "SandyBrown";
	// 	break;
	// case "bbYYrRoo":
	// 	geneString = "Chocolate";
	// 	break;
	// case "bByYrroo":
	// 	geneString = "Brown";
	// 	break;
	// case "bbYYrRoO":
	// 	geneString = "Brown";
	// 	break;
	// case "bbyYrRoo":
	// 	geneString = "Brown";
	// 	break;
	// case "bbyYrROO":
	// 	geneString = "Brown";
	// 	break;
	// case "bBYYrroo":
	// 	geneString = "Sienna";
	// 	break;
	// case "bbYYrROO":
	// 	geneString = "Sienna";
	// 	break;
	// case "bbyYRRoO":
	// 	geneString = "Tan";
	// 	break;
	// case "BByYrroo":
	// 	geneString = "BurlyWood";
	// 	break;
	// case "bbYYRRoO":
	// 	geneString = "RosyBrown";
	// 	break;
	// case "bbyYRROO":
	// 	geneString = "SandyBrown";
	// 	break;
	// case "bbyYRRoo":
	// 	geneString = "DarkGoldenRod";
	// 	break;
	// case "BBYYrroo":
	// 	geneString = "Tan";
	// 	break;
	// case "BByyrroo":
	// 	geneString = "BurlyWood";
	// 	break;
	// case "bbYYRROO":
	// 	geneString = "BlanchedAlmond";
	// 	break;
	// case "bbYYRRoo":
	// 	geneString = "Cornsilk";
	// 	break;
	// case "bByyrrOO":
	// 	geneString = "BlueViolet";
	// 	break;
	// case "bByYrroO":
	// 	geneString = "SlateBlue";
	// 	break;
	// case "bByYrrOO":
	// 	geneString = "Indigo";
	// 	break;
	// case "BByYrroO":
	// 	geneString = "RoyalBlue";
	// 	break;
	// case "BBYYrroO":
	// 	geneString = "BlueViolet";
	// 	break;
	// case "BByYrrOO":
	// 	geneString = "BlueViolet";
	// 	break;
	// case "BByyrroO":
	// 	geneString = "BlueViolet";
	// 	break;
	// case "BBYYrrOO":
	// 	geneString = "BlueViolet";
	// 	break;
	// case "BByyrrOO":
	// 	geneString = "MediumPurple";
	// 	break;
	// case "bByyRRoO":
	// 	geneString = "SteelBlue";
	// 	break;
	// case "bByyRROO":
	// 	geneString = "SkyBlue";
	// 	break;
	// case "bByyRRoo":
	// 	geneString = "DodgerBlue";
	// 	break;
	// case "bByYRRoO":
	// 	geneString = "Blue";
	// 	break;
	// case "bByYRRoo":
	// 	geneString = "RoyalBlue";
	// 	break;
	// case "BBYYrROO":
	// 	geneString = "Navy";
	// 	break;
	// default:
	// 	return "INVALID COLOR";
	// }
	
	return geneObject; 
};

/**
 * Sets the color gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setCoatColor = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.getGeneColor(0)) {
	case "INVALID COLOR":

		/* Reset to default values: */
		this.genes[17] = "B/b";
		this.genes[18] = "Y/y";
		this.genes[19] = "R/r";
		this.genes[20] = "O/o";
		this.genes[21] = "W/w";
		return false;
	default:
		var parts = new_gene.split(';');
		this.genes[17] = parts[0];
		this.genes[18] = parts[1];
		this.genes[19] = parts[2];
		this.genes[20] = parts[3];
		this.genes[21] = parts[4];
		return true;
	}
};

Genome.prototype.setManeColor = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.getGeneColor(0)) {
	case "INVALID COLOR":
		/* Reset to default values: */
		this.genes[22] = "B/b";
		this.genes[23] = "Y/y";
		this.genes[24] = "R/r";
		this.genes[25] = "O/o";
		this.genes[26] = "W/w";
		return false;
	default:
		var parts = new_gene.split(';');
		this.genes[22] = parts[0];
		this.genes[23] = parts[1];
		this.genes[24] = parts[2];
		this.genes[25] = parts[3];
		this.genes[26] = parts[4];
		return true;
	}
};

Genome.prototype.setEyeColor = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.getGeneColor(0)) {
	case "INVALID COLOR":
		/* Reset to default values: */
		this.genes[27] = "B/b";
		this.genes[28] = "Y/y";
		this.genes[29] = "R/r";
		this.genes[30] = "O/o";
		this.genes[31] = "W/w";
		return false;
	default:
		var parts = new_gene.split(';');
		this.genes[27] = parts[0];
		this.genes[28] = parts[1];
		this.genes[29] = parts[2];
		this.genes[30] = parts[3];
		this.genes[31] = parts[4];
		return true;
	}
};

/**
 * Retrieves the gene determining coat color
 *
 * This is defined as genes 17, 18, 19, 20, 21 (B/b;Y/y;R/r;O/o;W/w).
 *
 * @return Genome
 */
Genome.prototype.getCoatColor = function() {
	return Genome.fromString(this.elementAt(17).toString() + ";" + this.elementAt(18).toString() + ";" + this.elementAt(19).toString() + ";" + this.elementAt(20).toString() + ";" + this.elementAt(21).toString());
};

/**
 * Retrieves the gene determining mane color
 *
 * This is defined as genes 22, 23, 24, 25, 26 (B/b;Y/y;R/r;O/o;W/w).
 *
 * @return Genome
 */
Genome.prototype.getManeColor = function() {
	return Genome.fromString(this.elementAt(22).toString() + ";" + this.elementAt(23).toString() + ";" + this.elementAt(24).toString() + ";" + this.elementAt(25).toString() + ";" + this.elementAt(26).toString());
};

/**
 * Retrieves the gene determining eye color
 *
 * This is defined as genes 27, 28, 29, 30, 31 (B/b;Y/y;R/r;O/o;W/w).
 *
 * @return Genome
 */
Genome.prototype.getEyeColor = function() {
	return Genome.fromString(this.elementAt(27).toString() + ";" + this.elementAt(28).toString() + ";" + this.elementAt(29).toString() + ";" + this.elementAt(30).toString() + ";" + this.elementAt(31).toString() );
};

/**
 * Retrieves returns a string name for the coat color gene
 *
 * @return Object
 */
Genome.prototype.getCoatColorObject = function() {
	return this.getGeneColor(17);
}

/**
 * Retrieves returns a string name for the mane color gene
 *
 * @return Object
 */
Genome.prototype.getManeColorObject = function() {
	return this.getGeneColor(22);
}

/**
 * Retrieves returns a string name for the eye color gene
 *
 * @return Object
 */
Genome.prototype.getEyeColorObject = function() {
	return this.getGeneColor(27);
}



/**
 * Retrieves the gene determining the Strong stat.
 * This is defined as genes 32, 33 (S/s;T/t).
 *
 * @return Int
 */
Genome.prototype.getStrong= function() {
	return (this.doublePhenotype(32, "S/T") + 1);
}
/**
 * Retrieves the gene determining the Strong stat.
 *
 * This is defined as genes 32, 33 (S/s;T/t).
 *
 * @return Genome
 */
Genome.prototype.getStrongGene = function() {
	return Genome.fromString(this.elementAt(32).toString() + ";" + this.elementAt(33).toString());
};

/**
 * Sets the Strong gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setStrong = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "S/T")) {
	case -1:
		return false;
	default:
		this.genes[32] = new_gene.substring(0, 3);
		this.genes[33] = new_gene.substring(4, 7);
		return true;
	}
};



/**
 * Retrieves the gene determining the Energy stat.
 * This is defined as genes 34, 35 (E/e;N/n).
 *
 * @return Int
 */
Genome.prototype.getEnergy = function() {
	return (this.doublePhenotype(34, "E/N") + 1);
}
/**
 * Retrieves the gene determining the Energy stat.
 *
 * This is defined as genes 34, 35 (E/e;N/n).
 *
 * @return Genome
 */
Genome.prototype.getEnergyGene = function() {
	return Genome.fromString(this.elementAt(34).toString() + ";" + this.elementAt(35).toString());
};
/**
 * Sets the Energy gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setEnergy = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "E/N")) {
	case -1:
		return false;
	default:
		this.genes[34] = new_gene.substring(0, 3);
		this.genes[35] = new_gene.substring(4, 7);
		return true;
	}
};



/**
 * Retrieves the gene determining the Charm stat.
This is defined as genes 36, 37 (C/c;H/h).
 *
 * @return Int
 */
Genome.prototype.getCharm= function() {
	return (this.doublePhenotype(36, "C/H") + 1);
}
/**
 * Retrieves the gene determining the Charm stat.
 * This is defined as genes 36, 37 (C/c;H/h).
 *
 * @return Genome
 */
Genome.prototype.getCharmGene = function() {
	return Genome.fromString(this.elementAt(36).toString() + ";" + this.elementAt(37).toString());
};
/**
 * Sets the Charm gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setCharm = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "C/H")) {
	case -1:
		return false;
	default:
		this.genes[36] = new_gene.substring(0, 3);
		this.genes[37] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining the Thinking stat.
This is defined as genes 38, 39 (T/t;H/h).
 *
 * @return Int
 */
Genome.prototype.getThinking = function() {
	return (this.doublePhenotype(38, "T/H") + 1);
}
/**
 * Retrieves the gene determining the Thinking stat.
 * This is defined as genes 38, 39 (T/t;H/h).
 *
 * @return Genome
 */
Genome.prototype.getThinkingGene = function() {
	return Genome.fromString(this.elementAt(38).toString() + ";" + this.elementAt(39).toString());
};
/**
 * Sets the Thinking gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setThinking = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "T/H")) {
	case -1:
		return false;
	default:
		this.genes[38] = new_gene.substring(0, 3);
		this.genes[39] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining the Learning stat.
This is defined as genes 40, 41 (L/l;E/e).
 *
 * @return Int
 */
Genome.prototype.getLearning= function() {
	return (this.doublePhenotype(40, "L/E") + 1);
}
/**
 * Retrieves the gene determining the Learning stat.
 * This is defined as genes 40, 41 (L/l;E/e).
 *
 * @return Genome
 */
Genome.prototype.getLearningGene = function() {
	return Genome.fromString(this.elementAt(40).toString() + ";" + this.elementAt(41).toString());
};
/**
 * Sets the Learning gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setLearning = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "L/E")) {
	case -1:
		return false;
	default:
		this.genes[40] = new_gene.substring(0, 3);
		this.genes[41] = new_gene.substring(4, 7);
		return true;
	}
};



/**
 * Retrieves the inbreeding test gene.
 * This is defined as genes 42 (#;#).
 *
 * @return Int
 */
Genome.prototype.getInbreedingGene = function() {
	return Genome.fromString(this.elementAt(42).toString());
}

/**
 * Sets the inbreeding gene. 
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setInbreeding = function(new_gene) {
	
	var new_gene = new_gene.replace(";", "");
	var parts = new_gene.split('/');

	if (parts.length != 2)
		return false;
	
	if (Number.isInteger(Number(parts[0])) && Number.isInteger(Number(parts[1]))) {
		this.genes[42] = parts[0] + "/" + parts[1];
		return true;
	} else {
		return false;
	}
};


/**
 * Retrieves the gene determining coat length.
 * This is defined as genes 43 and 44 (C/c;L/l).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Genes		Index	base value
 * [ c l  ]     0		1 + random(0,2)
 * [ C L  ]     1		3 + random(0,2)
 * [ C lL ]     2		5 + random(0,2)
 * [ C l  ]     3		7 + random(0,2)
 * [ c lL ]     4		9 + random(0,2)
 * [ c L  ]     5		11 + random(0,2)
 *
 * @return Int
 */
 Genome.prototype.getCoatLength = function() {
	switch (this.doublePhenotype(43, "C/L")) {
	case 0:
		return 1.00;
	case 1:
		return 3.00;
	case 2:
		return 5.00;
	case 3:
		return 7.00;
	case 4:
		return 9.00;
	case 5:
		return 11.00;
	default:
		return -1;
	}
}

/**
 * Sets the coat length.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setCoatLength = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);

	switch (test_gene.doublePhenotype(0, "C/L")) {
	case -1:
		 // gene string does not match, abort.

		return false;
	default:
		// we matched a valid gene, continue.
		this.genes[43] = new_gene.substring(0, 3);
		this.genes[44] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining coat length.
 * This is defined as genes 43 and 44 (E/e;F/f).
 *
 * @return Genome
 */
Genome.prototype.getCoatLengthGene = function() {
	return Genome.fromString(this.elementAt(43).toString() + ";" + this.elementAt(44).toString());
};

/**
 * Retrieves returns a string name for the coat length.
 *
 * This is defined as genes 43 and 44 (C/c;L/l).
 * 
 * C is dominate over c, L/l are non-dominate to each other.
 *
 * @return String
 */
Genome.prototype.getCoatLengthDesc = function() {
	switch (this.getCoatLength()) {
	case 11.00:
		return "Longest (11 - 13 cm)";
	case 9.00:
		return "Longer (9 - 11 cm)";
	case 7.00:
		return "Long (7 - 9 cm)";
	case 5.00:
		return "Average (5 - 7 cm)";
	case 2.00:
		return "Shorter (3 - 5 cm)";
	case 1.00:
		return "Shortest (1 - 3 cm)";
	default:
		return "UNDEFINED COAT LENGTH";
	}
};

/**
 * Retrieves the gene determining coat density.
 * This is defined as genes 45 and 46 (C/c;D/d).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Genes		Index	base value
 * [ c d  ]     0		40 + random(0,30)
 * [ C D  ]     1		70 + random(0,30)
 * [ C dD ]     2		90 + random(0,30)
 * [ C d  ]     3		120 + random(0,30)
 * [ c dD ]     4		140 + random(0,30)
 * [ c D  ]     5		170 + random(0,30)
 *
 * @return Int
 */
Genome.prototype.getCoatDensity = function() {

	switch (this.doublePhenotype(45, "C/D")) {
	case 0:
		return 40;
	case 1:
		return 70;
	case 2:
		return 90;
	case 3:
		return 120;
	case 4:
		return 140;
	case 5:
		return 170;
	default:
		return -1;
	}
}


/**
 * Sets the coat density gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setCoatDensity = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "C/D")) {
	case -1:
		return false;
	default:
		this.genes[45] = new_gene.substring(0, 3);
		this.genes[46] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining adult coat density
 *
 * This is defined as genes 45 and 46 (C/c;D/d).
 *
 * @return Genome
 */
Genome.prototype.getCoatDensityGene = function() {
	return Genome.fromString(this.elementAt(45).toString() + ";" + this.elementAt(46).toString());
};

/**
 * Retrieves returns a string name for the coat density gene.
 *
 * C is dominate over c, D/d are non-dominate to each other.
 *
 * @return String
 */
Genome.prototype.getCoatDensityDesc = function() {
	switch (this.getCoatDensity()) {
	case 40:
		return "Thinest";
	case 70:
		return "Thin";
	case 90:
		return "Normal";
	case 120:
		return "Thick";
	case 140:
		return "Thicker";
	case 170:
		return "Thickest";
	default:
		return "UNDEFINED COAT DENSITY";
	}
};

/**
 * Retrieves the gene determining coat curl.
 * This is defined as genes 47 and 48 (C/c;C/c).
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Genes		Index	base value
 * [ c c  ]     0		0
 * [ C C  ]     1		1
 * [ C cC ]     2		2
 * [ C c  ]     3		3
 * [ c cC ]     4		4
 * [ c C  ]     5		5
 *
 * @return Int
 */
 Genome.prototype.getCoatCurl = function() {
	switch (this.doublePhenotype(47, "C/C")) {
	case 0:
		return 0;
	case 1:
		return 1;
	case 2:
		return 2;
	case 3:
		return 3;
	case 4:
		return 4;
	case 5:
		return 5;
	default:
		return -1;
	}
}


/**
 * Sets the coat curl gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setCoatCurl = function(new_gene) {
	var test_gene = Genome.fromString(new_gene);
	switch (test_gene.doublePhenotype(0, "C/C")) {
	case -1:
		return false;
	default:
		this.genes[47] = new_gene.substring(0, 3);
		this.genes[48] = new_gene.substring(4, 7);
		return true;
	}
};

/**
 * Retrieves the gene determining coat curl
 *
 * This is defined as genes 47 and 48 (C/c;C/c).
 *
 * @return Genome
 */
Genome.prototype.getCoatCurlGene = function() {
	return Genome.fromString(this.elementAt(47).toString() + ";" + this.elementAt(48).toString());
};

/**
 * Retrieves returns a string name for the coat curl gene.
 *
 * C is dominate over c, C/c are non-dominate to each other.
 *
 * @return String
 */
Genome.prototype.getCoatCurlDesc = function() {
	switch (this.getCoatCurl()) {
	case 0:
		return "Bristly";
	case 1:
		return "Straight";
	case 2:
		return "Wavey";
	case 3:
		return "Very Wavey";
	case 4:
		return "Curly";
	case 5:
		return "Tightly Curled";
	default:
		return "UNDEFINED COAT CURL";
	}
};

/**
 * Retrieves the gene determining subspecies.
 * This is defined as gene 49 and is a 2 digit hex value (00-FF)
 * 
 * There are 6 phenotype combinations
 * for Fluffy genes, they are indexed as:
 * 
 * Genes    Subspecies
 * [ 00-12 ]    Standard fluffy
 * [ 13-25 ]    Microfluffies
 * [ 26-38 ]    Angorafluffies
 * [ 39-4B ]    Fluffalos
 * [ 4C-5E ]    Seafluffies
 * [ 5F-71 ]    Loafies
 * [ 72-84 ]    Plantfluffies
 * [ 85-255 ]    Undefined/expansion - reset to 00 if encountered.
 *
 * @return Int
 */
 Genome.prototype.getSubSpecies = function() {
	const parts = this.elementAt(49).toString().split('/');
	const subSpecies = parseInt(parts[0] + parts[1], 16);

	switch (true)
	{
		case (subSpecies <= 18):
			return 0; // standard
		case (subSpecies <= 37):
			return 1; // micro
		case (subSpecies <= 56):
			return 2; // angora
		case (subSpecies <= 64):
			return 3; //fluffalo
		case (subSpecies <= 73):
			return 4; //sea
		case (subSpecies <= 82):
			return 5; //loafies
		case (subSpecies <= 91):
			return 6; //plant
		default:
			this.genes[49] = "0/0";
			return 0; // standard
	}
 }



/**
 * Sets the subspecies gene.  Used for the gene lab.
 *
 * @param string new_gene string
 * 
 * @return boolean - true if the gene was found valid and set, false if it was found to be invalid.
 */
Genome.prototype.setSubSpecies = function(new_gene) {
	var new_gene = new_gene.replace(";", "");
	var parts = new_gene.split('/');

	if (parts.length != 2)
	{
		this.genes[49] = "0/0";
		return true;
	}
	
	if (isNaN(parseInt(parts[0] + parts[1], 16)))
	{
		// if it's invald just set it to the default value.
		this.genes[49] = "0/0";
		return true;
	}

	if (Number.isInteger(Number(parts[0])) && Number.isInteger(Number(parts[1]))) {
		this.genes[49] = parts[0] + "/" + parts[1];
		return true;
	} else {
		// if it's invald just set it to the default value.
		this.genes[49] = "0/0";
		return true;
	}
};

/**
 * Retrieves the gene determining subcpeices
 *
 * This is defined as genes 49 (hex value).
 *
 * @return Genome
 */
Genome.prototype.getSubSpeciesGene = function() {
	return Genome.fromString(this.elementAt(49).toString());
};

/**
 * Retrieves returns a string name for the subspecies.
 *
 * @return String
 */
Genome.prototype.getSubSpeciesDesc = function(subspecies) {
	var _sub = subspecies ? subspecies : this.getSubSpecies()
	switch (_sub) {
	case 0:
		return "Fluffy Pony";
	case 1:
		return "Micro Fluffy";
	case 2:
		return "Angora Fluffy";
	case 3:
		return "Fluffalo";
	case 4:
		return "Sea Fluffy";
	case 5:
		return "Loaffy";
	case 6:
		return "Plant Fluffy";
	default:
		return "UNDEFINED SUB SPECIES";
	}
};

/**
 * Clears a defect gene - sets one or both allees to uper case, so long a they are not both lower.
 *
 * @param int index - the starting index of the gene
 * 
 */
Genome.prototype.clearDefect = function(index) {
	var parts;

	switch (index) {
	case 12:
		// length
		index = 3;
		parts = this.genes[3].toString().split('/');
		break;
	case 20: 
		// height
		index = 5;
		parts = this.genes[5].toString().split('/');
		break;
	case 28: 
		// weight
		index = 7;
		parts = this.genes[7].toString().split('/');
		break;
	case 36: 
		//age
		index = 9;
		parts = this.genes[9].toString().split('/');
		break;
	case 44: 
		// fertility
		index = 11;
		parts = this.genes[11].toString().split('/');
		break;
	case 52: 
		// matiruty
		index = 13;
		parts = this.genes[13].toString().split('/');
		break;
	case 80: 
		index = 20;
		parts = this.genes[20].toString().split('/');
		break;
	case 100: 
		index = 25;
		parts = this.genes[25].toString().split('/');
		break;
	case 120: 
		index = 30;
		parts = this.genes[30].toString().split('/');
		break;
	case 84: 
		index = 21;
		parts = this.genes[21].toString().split('/');
		break;
	case 104: 
		index = 26;
		parts = this.genes[26].toString().split('/');
		break;
	case 124: 
		index = 31;
		parts = this.genes[31].toString().split('/');
		break;
	}

	
	var ran = Math.floor(((Math.random() * 2) + 1));


	switch (ran) {
	case 1:
		parts[0] = parts[0].toUpperCase(); 
		break;
	case 2:
		parts[1] = parts[1].toUpperCase();
		break;
	case 3:
		parts[0] = parts[0].toUpperCase(); 
		parts[1] = parts[1].toUpperCase();
		break;
	}

	this.genes[index] = parts[0] + "/" + parts[1];
};
