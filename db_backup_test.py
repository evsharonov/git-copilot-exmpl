import os
import shutil
import logging
from db_backup import backup_db, restore_db

def test_backup_db():
    # Setup
    active_db_file = 'app.db'
    backup_db_file = 'backup.db'
    with open(active_db_file, 'w') as f:
        f.write('test data')

    # Test
    backup_db()
    assert os.path.exists(backup_db_file), "Backup file was not created"
    with open(backup_db_file, 'r') as f:
        assert f.read() == 'test data', "Backup file content does not match"

    # Teardown
    os.remove(active_db_file)
    os.remove(backup_db_file)

def test_restore_db():
    # Setup
    active_db_file = 'app.db'
    backup_db_file = 'backup.db'
    with open(backup_db_file, 'w') as f:
        f.write('test data')

    # Test
    restore_db()
    assert os.path.exists(active_db_file), "Active DB file was not restored"
    with open(active_db_file, 'r') as f:
        assert f.read() == 'test data', "Active DB file content does not match"

    # Teardown
    os.remove(active_db_file)
    os.remove(backup_db_file)

def test_backup_db_file_not_found(caplog):
    # Setup
    active_db_file = 'app.db'
    if os.path.exists(active_db_file):
        os.remove(active_db_file)

    # Test
    with caplog.at_level(logging.ERROR):
        backup_db()
        assert 'Error: app.db not found.' in caplog.text, "FileNotFoundError not logged"

def test_restore_db_file_not_found(caplog):
    # Setup
    backup_db_file = 'backup.db'
    if os.path.exists(backup_db_file):
        os.remove(backup_db_file)

    # Test
    with caplog.at_level(logging.ERROR):
        restore_db()
        assert 'Error: backup.db not found.' in caplog.text, "FileNotFoundError not logged"