import React from 'react'
import PropsList from 'private/modules/PropsList'
import docs from '!!docgen!react-conventions/lib/Icon/Icon'
import CodeExample from 'private/modules/CodeExample'
import ExampleInlineEditDefault from './ExampleInlineEditDefault'
import exampleInlineEditDefaultCode from '!raw!./ExampleInlineEditDefault'
import ExampleInlineEditCallback from './ExampleInlineEditCallback'
import exampleInlineEditCallbackCode from '!raw!./ExampleInlineEditCallback'
import ExampleInlineEditInline from './ExampleInlineEditInline'
import exampleInlineEditInline from '!raw!./ExampleInlineEditInline'
import styles from 'private/css/content'

const description = {
  inlineEditDefault: 'This is the default **inline edit component**.',
  inlineEditCallback: 'This is the **inline edit component** with a callback function to edit.',
  inlineEditInline: 'This is the **inline edit component** that is inline with other components.'
};

const InlineEditPage = () => (
  <div>
    <div className={styles.content}>
      <div className={styles.block}>
        <CodeExample
          title='Default Inline Edit'
          description={description.inlineEditDefault}
          markup={exampleInlineEditDefaultCode}>
          <ExampleInlineEditDefault />
        </CodeExample>
        <CodeExample
          title='Inline Edit with Callback to Edit'
          description={description.inlineEditCallback}
          markup={exampleInlineEditCallbackCode}>
          <ExampleInlineEditCallback />
        </CodeExample>
        <CodeExample
          title='Inline Edit inline'
          description={description.inlineEditInline}
          markup={exampleInlineEditInline}>
          <ExampleInlineEditInline />
        </CodeExample>
      </div>
    </div>
  </div>
)

export default InlineEditPage