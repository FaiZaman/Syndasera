require 'test_helper'

class SynDataRequestControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get syn_data_request_new_url
    assert_response :success
  end

end
