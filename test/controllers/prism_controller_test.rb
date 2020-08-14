require 'test_helper'

class PrismControllerTest < ActionDispatch::IntegrationTest
  test "should get get_data" do
    get prism_get_data_url
    assert_response :success
  end

end
