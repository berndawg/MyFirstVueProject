"use strict";

const StepStatus = {
    CannotStart: "cannotStart",
    NotStarted: "notStarted",
    InProgress: "inProgress",
    Completed: "completed"
}

class Step {
    static _id = 0;

    constructor(group, text) {
        this.group = group;
        this.text = text;
        this.status = StepStatus.NotStarted;
        this.id = Step._id;
        Step._id++;
    }

    // can be overridden
    get canBeStarted() {
        if (this.status == StepStatus.CannotStart) return false;
        // todo: if previous steps haven't been completed, can't start
        return true;
    }
}

class StepWizard {
    constructor(applicationData, stepDetails) {
        this.applicationData = applicationData;
        this.Steps = stepDetails;
        this.CurrentStep = null;
    }

    getGroups() {
        const results = this.Steps.map(x => x.group);
        const uniqueArray = [...new Set(results)];
        return uniqueArray;
    }

    getGroupSteps(group) {
        return this.Steps.filter(x => x.group == group);
    }

    getStep(id) {
        return this.Steps[id];
    }

    getGroupStatus(group) {
        var groups = this.getGroupSteps(group)
        if (groups.some(x => x.status == StepStatus.InProgress)) return StepStatus.InProgress;
        if (groups.every(x => x.status == StepStatus.Completed)) return StepStatus.Completed;
        return StepStatus.NotStarted;
    }

    isFirstStep(id) {
        return id == 0;
    }

    isLastStep(id) {
        return id == this.Steps.lastIndexOf();
    }

    allStepsCompleted() {
        return this.Steps.filter(x=>x.status == StepStatus.Completed).length == this.Steps.length;
    }

    completeStep(id) {
        var step = this.getStep(id);
        
        if (step.status != StepStatus.InProgress) throw new Error('Cannot complete step, id');
        step.status = StepStatus.Completed;
    }

    startStep(id) {
        var step = this.getStep(id);
        
        if (step.status == StepStatus.CannotStart) throw new Error('Cannot start step, id');

        this.currentStepId = id;
    }
}

export { StepStatus, Step, StepWizard }
