export var WorkerJobName;
(function (WorkerJobName) {
    WorkerJobName["CREATE_QUEUE_ENTRY_AFTER_PAYMENT"] = "create-queue-entry-after-payment";
    WorkerJobName["RESTORE_FROZEN_ENTRIES_AFTER_CHECKIN"] = "restore-frozen-entries-after-checkin";
    WorkerJobName["FREEZE_EXPIRED_ENTRIES"] = "freeze-expired-entries";
    WorkerJobName["REMOVE_EXPIRED_FROZEN_ENTRIES"] = "remove-expired-frozen-entries";
    WorkerJobName["RUN_SLOT_SETTLEMENT"] = "run-slot-settlement";
    WorkerJobName["RELEASE_CASHBACK_AFTER_OBSERVATION"] = "release-cashback-after-observation";
    WorkerJobName["CLAWBACK_AFTER_REFUND"] = "clawback-after-refund";
    WorkerJobName["CHECK_INVITE_COOLING_OFF"] = "check-invite-cooling-off";
    WorkerJobName["PAYOUT_AFTER_WITHDRAWAL_APPROVAL"] = "payout-after-withdrawal-approval";
    WorkerJobName["SCORE_RISK_CASE"] = "score-risk-case";
})(WorkerJobName || (WorkerJobName = {}));
//# sourceMappingURL=worker-job-name.js.map