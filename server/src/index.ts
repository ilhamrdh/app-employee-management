import { logger } from './configs/logging';
import { web } from './configs/web';

web.listen(3000, () => {
  logger.info('Server running on port 3000');
});
