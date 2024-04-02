variable "image_operating_system" {
    default     = "Oracle Linux"
    description = "The OS/image installed on all nodes in the node pool."
}
variable "image_operating_system_version" {
    default     = "7.9"
    description = "The OS/image version installed on all nodes in the node pool."
}

variable "node_pool_instance_shape" {
    type = map(any)
    default = {
        "instanceShape" = "VM.Standard.E4.Flex"
        "ocpus"         = 2
        "memory"        = 16
    }
    description = "A shape is a template that determines the number of OCPUs, amount of memory, and other resources allocated to a newly created instance for the Worker Node. Select at least 2 OCPUs and 16GB of memory if using Flex shapes"
}