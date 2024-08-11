"use strict";

const StepStatus = {
    CannotStart: "cannotStart",
    NotStarted: "notStarted",
    InProgress: "inProgress",
    Completed: "completed"
}


class StepDetail {
    constructor(id, parentId, type, text, status) {
        this.id = id;
        this.parentId = parentId;
        this.type = type;
        this.text = text;
        this.status = status;
    }
}

class StepWizard {
    constructor(stepDetails) {
        this.StepDetails = stepDetails;
    }

    getSteps() {
        return this.StepDetails.filter(x => x.type == 'step');
    }

    getSubSteps(id) {
        return this.StepDetails.filter(x => x.parentId == id);
    }

    getStep(id) {
        return this.StepDetails[id - 1];
    }

    getParentStep(id) {
        var step = this.getStep(id);
        var parent = this.getStep(step.parentId);
        return parent;
    }

    
}

export { StepStatus, StepDetail, StepWizard }
