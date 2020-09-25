S3DirectUpload.config do |c|
  c.access_key_id = "AKIA4JZSXZDCHN22VOEX"       # your access key id
  c.secret_access_key = "BM146K7eHizCSVzBMT8PFmxvd9ueUWQIY8L0g8k0"   # your secret access key
  c.bucket = "sagemaker-eu-west-2-845678102724"              # your bucket name
  c.region = "eu-west-2"             # region prefix of your bucket url. This is _required_ for the non-default AWS region, eg. "s3-eu-west-1"
  c.url = "https://s3.console.aws.amazon.com/s3/buckets/sagemaker-eu-west-2-845678102724/"                # S3 API endpoint (optional), eg. "https://#{c.bucket}.s3.amazonaws.com/"
end
