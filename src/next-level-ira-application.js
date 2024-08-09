"use strict";

//const Status = {
//    CannotStart: "cannotStart",
//    NotStarted: "notStarted",
//    InProgress: "inProgress",
//    Completed: "completed"
//}
class ApplicationData {
    constructor() {
        this.isAcknowledged = null;
        this.isForeignActor = null;
        this.firstName = null;
        this.lastName = null;
        this.dateOfBirth = null;
        this.legalResidencyStatus = null;
        this.taxId = null;
        this.address = null;
        this.address2 = null;
        this.city = null;
        this.state = null;
        this.postalCode = null;
        this.country = null;
        this.otherRegion = null;
        this.isMailingAddressSame = false;
        this.photoIdType = '';
        this.phoneNumber = null;
        this.isCannabisRelatedBusiness = null;
        this.occupation = null;
        this.isEmployed = null;
        this.expectedAnnualIncome = 0;
        this.expectedRolloverAmount = 0;
    }
}

class Step {
    constructor(name) {
        this.name = name;
    }

    get status() {
        throw new Error("property 'status' must be implemented in derived classes.");
    }

    get subSteps() {
        throw new Error("property 'subSteps' must be implemented in derived classes.");
    }
}

class SubStep {
    constructor(name) {
        this.name = name;
    }

    get status() {
        throw new Error("property 'status' must be implemented in derived classes.");
    }
}

class AcknowledgementsSubStep extends SubStep {
    constructor() {
        super("Acknowledgements")
    }
}

class PersonalDetailsSubStep extends SubStep {
    constructor() {
        super("Personal Details")
    }
}

class LegalResidencySubStep extends SubStep {
    constructor() {
        super("Legal residency status")
    }
}

class AddressSubStep extends SubStep {
    constructor() {
        super("Address")
    }
}

class PhotoIdSubStep extends SubStep {
    constructor() {
        super("Photo ID")
    }
}

class ContactInformationSubStep extends SubStep {
    constructor() {
        super("Contact information")
    }
}

class IdentificationInformationStep extends Step {
    constructor() {
        super("Identification  information");
        this.acknowledgementsSubStep = new AcknowledgementsSubStep();
        this.personalDetailsSubStep = new PersonalDetailsSubStep();
        this.legalResidencySubStep = new LegalResidencySubStep();
        this.addressSubStep = new AddressSubStep();
        this.photoIdSubStep = new PhotoIdSubStep();
        this.contactInformationSubStep = new ContactInformationSubStep();

        this.currentSubStep = this.acknowledgementsSubStep;
    }

    get subSteps() {
        return [this.acknowledgementsSubStep, this.personalDetailsSubStep, this.legalResidencySubStep, this.addressSubStep, this.photoIdSubStep, this.contactInformationSubStep];
    }
}

class EmployerInformationSubStep extends SubStep {
    constructor() {
        super("Employer information");
    }
}
class EmploymentInformationSubStep extends SubStep {
    constructor() {
        super("Employment information");
    }
}

class IncomeSubStep extends SubStep {
    constructor() {
        super("Income");
    }
}

class EmploymentInformationStep extends Step {
    constructor() {
        super("Employment information");

        this.employerinformationSubStep = new EmployerInformationSubStep();
        this.employmentInformationSubStep = new EmploymentInformationSubStep();
        this.incomeSubStep = new IncomeSubStep();
    }

    get subSteps() {
        return [this.employerinformationSubStep, this.employmentInformationSubStep, this.incomeSubStep];
    }
}

class Agreement1SubStep extends SubStep {
    constructor() {
        super("Agreement 1");
    }
}
class Agreement2SubStep extends SubStep {
    constructor() {
        super("Agreement 2");
    }
}

class TermsAndConditionsStep extends Step {
    constructor() {
        super("Terms and conditions")

        this.agreement1SubStep = new Agreement1SubStep();
        this.agreement2SubStep = new Agreement2SubStep();
    }

    get subSteps() {
        return [this.agreement1SubStep, this.agreement1SubStep];
    }
}
class ReviewAndSubmitStep extends Step {
    constructor() {
        super("Review and submit")
    }

    get subSteps() {
        return [];
    }
}

class NextLevelIraApplication {
    constructor() {
        this.data = new ApplicationData();

        this.identificationInformationStep = new IdentificationInformationStep();
        this.employmentInformationStep = new EmploymentInformationStep();
        this.termsAndConditionsStep = new TermsAndConditionsStep();
        this.reviewAndSubmitStep = new ReviewAndSubmitStep();

        this.currentStep = this.identificationInformationStep;
    }

    get steps() {
        return [this.identificationInformationStep, this.employmentInformationStep, this.termsAndConditionsStep, this.reviewAndSubmitStep];
    }

    save() {
        // serialize, stored in Prospect.NextLevelIraApplicationJson
        // update prospect
    }
}

export default NextLevelIraApplication;