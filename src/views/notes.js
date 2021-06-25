import { useStore } from 'react-context-hook';
import { useHistory } from 'react-router-dom';
import { Note, SectionHeader } from '../components/components';
import { NotesRepo } from '../data/repository';

const Notes = () => {
  const [notes, setNotes, deleteNotes] = useStore('data.notes', NotesRepo.getAllData());
  const history = useHistory();

  return (
    <section className="notes">
      <SectionHeader title='Notes' onCreate={() => history.push('/note')} />
      <div className="container" data-empty="Notes">
        {notes.length !== 0 && <div className="notes-list">
          {notes.map(n => <Note key={n.id} model={n} />)}
        </div>}
      </div>
    </section>
  );
}

export default Notes;