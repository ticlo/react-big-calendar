import os
import glob
import re

files = glob.glob('stories/props/formats*.stories.jsx')

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Update imports
    content = re.sub(
        r"import \{ Calendar, Views, luxonLocalizer \} from '\.\./\.\./src'",
        r"import { Views } from '../../src'\nimport { Calendar } from '../helpers'",
        content
    )
    content = re.sub(
        r"import \{ Calendar, luxonLocalizer \} from '\.\./\.\./src'",
        r"import { Calendar } from '../helpers'",
        content
    )
    
    # Remove mLocalizer
    content = re.sub(r"const mLocalizer = luxonLocalizer\(DateTime\)\n", "", content)
    content = content.replace("localizer={mLocalizer}", "")
    
    # Fix tokens
    content = content.replace("dddd", "EEEE")
    content = content.replace("Do", "d")
    
    with open(file_path, 'w') as f:
        f.write(content)
print(f"Updated {len(files)} files")
