require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get pages_home_url
    assert_response :success
  end

  test "should get about" do
    get pages_about_url
    assert_response :success
  end

  test "should get prism_dashboard" do
    get pages_prism_dashboard_url
    assert_response :success
  end

  test "should get our_methods" do
    get pages_our_methods
    assert_response :success
  end

end
