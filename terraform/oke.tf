variable "kubernetes_version" {
  type        = string
  description = "Latest kubernetes version at the moment"
  default     = "v1.28.2"

}
resource "oci_containerengine_cluster" "oke-cluster" {
  #Required
  compartment_id     = var.ociCompartmentOcid
  kubernetes_version = var.kubernetes_version
  name               = "mtdrworkshopcluster"
  vcn_id             = oci_core_vcn.okevcn.id

  endpoint_config {
    #optional
    is_public_ip_enabled = "true"
    nsg_ids = [
    ]
    subnet_id = oci_core_subnet.endpoint.id
  }

  #optional

  options {
    service_lb_subnet_ids = [oci_core_subnet.svclb_Subnet.id]

    add_ons {
      #Optional
      is_kubernetes_dashboard_enabled = "false"
      is_tiller_enabled               = "false"
    }
    admission_controller_options {
      #Optional
      is_pod_security_policy_enabled = "false"
    }
    kubernetes_network_config {
      #Optional
      pods_cidr     = "10.244.0.0/16"
      services_cidr = "10.96.0.0/16"
    }
  }
}


resource "oci_containerengine_node_pool" "oke-node-pool" {
  # Required
  cluster_id         = oci_containerengine_cluster.oke-cluster.id
  compartment_id     = var.ociCompartmentOcid
  kubernetes_version = var.kubernetes_version
  name               = "Pool"
  node_shape = "VM.Standard.E3.Flex"
  
  node_config_details{
        placement_configs{
            availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
            subnet_id = oci_core_subnet.vcn-private-subnet.id
          } 
          placement_configs{
            availability_domain = data.oci_identity_availability_domains.ads.availability_domains[1].name
            subnet_id = oci_core_subnet.vcn-private-subnet.id
          }
          placement_configs{
            availability_domain = data.oci_identity_availability_domains.ads.availability_domains[2].name
            subnet_id = oci_core_subnet.vcn-private-subnet.id
          }
          size = 3
        }
        
    node_source_details {
      source_type             = "IMAGE"
      image_id                = data.oci_core_images.node_pool_images.images[0], "id"
      boot_volume_size_in_gbs = var.node_pool_boot_volume_size_in_gbs
    }
    
    data "oci_core_images" "node_pool_images" {
      compartment_id           = var.ociCompartmentOcid
      operating_system         = var.image_operating_system
      operating_system_version = var.image_operating_system_version
      shape                    = var.node_pool_instance_shape.instanceShape
      sort_by                  = "TIMECREATED"
      sort_order               = "DESC"
    }
}
