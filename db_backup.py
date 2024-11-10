import shutil
import logging

active_db_file = 'app.db'
backup_db_file = 'backup.db'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def backup_db():
    try:
        shutil.copy(active_db_file, backup_db_file)
        logging.info(f'Backup created: {backup_db_file}')
    except FileNotFoundError:
        logging.error(f'Error: {active_db_file} not found.')
    except PermissionError:
        logging.error(f'Error: Permission denied while accessing {active_db_file} or {backup_db_file}.')
    except Exception as e:
        logging.error(f'An unexpected error occurred: {e}')

def restore_db():
    try:
        shutil.copy(backup_db_file, active_db_file)
        logging.info(f'Restored backup: {active_db_file}')
    except FileNotFoundError:
        logging.error(f'Error: {backup_db_file} not found.')
    except PermissionError:
        logging.error(f'Error: Permission denied while accessing {backup_db_file} or {active_db_file}.')
    except Exception as e:
        logging.error(f'An unexpected error occurred: {e}')

def main():
    print('1. Backup database')
    print('2. Restore database')
    print('3. Exit')
    while True:
        try:
            choice = input('Enter your choice: ')
            if choice == '1':
                backup_db()
            elif choice == '2':
                restore_db()
            elif choice == '3':
                logging.info('Exiting...')
                break
            else:
                logging.warning('Invalid choice')
        except Exception as e:
            logging.error(f'An unexpected error occurred: {e}')

if __name__ == '__main__':
    main()