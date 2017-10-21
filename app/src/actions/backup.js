export const IMPORT_BACKUP = 'IMPORT_BACKUP'

export function importBackup ({todos, pomodoros, settings}) {
  return {type: IMPORT_BACKUP, payload: {todos, pomodoros, settings}}
}
