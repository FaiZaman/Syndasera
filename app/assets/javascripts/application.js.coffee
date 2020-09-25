#= require s3_direct_upload

jQuery ->
  $("#s3-uploader").S3Uploader()
  click_submit_target: $('.submit-target')
