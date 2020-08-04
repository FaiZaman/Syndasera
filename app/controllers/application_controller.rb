class ApplicationController < ActionController::Base

    protected
    def authenticate_user
      if user_signed_in?
        super
      else
        redirect_to login_path, :notice => 'Please log in or sign up to make a request.'
      end
    end

end
