module ApplicationHelper

    def replace_na(variable)
        if variable.is_a?(NilClass) 
            return "N/A" 
        else 
            return variable
        end
    end

end
