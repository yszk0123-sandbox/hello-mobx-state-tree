import { observer } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';
// FIXME: Remove this polyfill
// mobx-state-tree depends on setImmediate which is not implemented in browsers...
import 'setimmediate';
import { AppDependencies } from './di';
import { createApp } from './models';
import { IAppModel } from './models-type';
import { fetchListItems } from './usecases';

const App = observer(({ list }: IAppModel) => {
  const onClick = () => list.addItem('new');

  return (
    <div>
      There are {list.count} items!
      <ul>
        {list.items.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <button onClick={onClick}>Add</button>
    </div>
  );
});

async function main() {
  const dependencies: AppDependencies = {
    usecases: {
      fetchListItems,
    },
  };
  const app = createApp(dependencies);
  await app.list.fetch();
  render(<App list={app.list} />, document.getElementById('app'));
}

main().catch(console.error);
