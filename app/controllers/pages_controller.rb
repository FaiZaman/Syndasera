class PagesController < ApplicationController

  before_action :authenticate_user!, only: [:make_request]

  def home
  end

  def about
  end

  def make_request
  end
end
