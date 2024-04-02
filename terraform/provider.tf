terraform {
  required_providers {
    oci = {
      source = "oracle/oci"
    }
  }
}

provider "oci" {
  region              = var.ociRegionIdentifier
  auth                = "SecurityToken"
  config_file_profile = "DEFAULT"
}