import type {
  InviteRelationStatus,
  QueueEntryStatus,
  UserQueueGuardStatus,
  WithdrawalStatus
} from "@queuefree/shared";

type Tone = "brand" | "success" | "warning" | "danger" | "neutral";

export function getQueueStatusTone(status: QueueEntryStatus): Tone {
  switch (status) {
    case "ACTIVE":
      return "brand";
    case "WON_PENDING_RELEASE":
    case "CASHBACK_RELEASED":
      return "success";
    case "FROZEN":
      return "warning";
    case "REMOVED":
    case "CLAWBACK_DONE":
      return "danger";
    default:
      return "neutral";
  }
}

export function getInviteStatusTone(status: InviteRelationStatus): Tone {
  switch (status) {
    case "EFFECTIVE":
      return "success";
    case "PENDING_EFFECTIVE":
      return "warning";
    case "INVALID":
      return "danger";
    default:
      return "brand";
  }
}

export function getWithdrawalStatusTone(status: WithdrawalStatus): Tone {
  switch (status) {
    case "SUCCESS":
      return "success";
    case "PROCESSING":
    case "RISK_REVIEW":
      return "warning";
    case "FAILED":
    case "REJECTED":
    case "REVERSED":
      return "danger";
    default:
      return "brand";
  }
}

export function getGuardStatusTone(status: UserQueueGuardStatus): Tone {
  return status === "VALID" ? "success" : "warning";
}
