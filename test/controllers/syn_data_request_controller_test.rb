require 'test_helper'

class SynDataRequestControllerTest < ActionDispatch::IntegrationTest
  test "should get make_request" do
    get syn_data_request_make_request_url
    assert_response :success
  end

end
