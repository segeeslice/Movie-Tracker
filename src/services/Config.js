// File for exporting and modifying configuration data
import config from '../../config.yaml'
config.categories = config.categories.sort()

export default config
