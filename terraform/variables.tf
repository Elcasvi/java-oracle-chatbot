//Copyright (c) 2021 Oracle and/or its affiliates.
//Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
variable "ociTenancyOcid" {
  type        = string
  description = "OCI Tenancy OCID"
  default     = "ocid1.tenancy.oc1..aaaaaaaabaohxpalp4nnyhohejofdn3bghun6tug2rvbls5xs3272hiagbka"
}

variable "ociUserOcid" {
  type        = string
  description = "OCI User OCID"
  default     = "ocid1.user.oc1..aaaaaaaaaj5ebty5ttrk6m5jk6ckofxr5rsy743oxspz7mitunljnubjgrya"
}

variable "ociCompartmentOcid" {
  type        = string
  description = "OCI Compartment OCID"
  default     = "ocid1.compartment.oc1..aaaaaaaabktuqzbutb3hmufk7c7ud6z3chflyhn3bdeefychupwsmxsu6f6a"
}

variable "ociRegionIdentifier" {
  type        = string
  description = "OCI Region Identifier"
  default     = "mx-queretaro-1"
}

variable "mtdrDbName" {
  type        = string
  description = "MTDR Database Name"
  default     = "ChatBotDBInstance"
}

variable "runName" {
  type        = string
  description = "Run Name"
  default     = "production-deployment"
}
